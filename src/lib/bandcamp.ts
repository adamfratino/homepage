import { get } from "node:https";
import { createGunzip } from "node:zlib";

import { cacheLife, cacheTag } from "next/cache";

import { BANDCAMP_FAN_URL, BANDCAMP_USER_AGENT } from "@/constants/bandcamp";
import { RECENT_VINYL_LIMIT } from "@/constants/hobbies";

export type Purchase = {
  title: string;
  artist: string;
  /** The album or track page on Bandcamp. */
  url: string;
  /** When the item was bought, as an ISO timestamp. */
  purchasedAt: string;
};

/** One entry of the fan page's collection cache; only the fields the site uses. */
type CollectionItem = {
  band_name?: string;
  item_title?: string;
  item_url?: string;
  /** e.g. "12 Jul 2025 03:02:46 GMT". */
  purchased?: string | null;
  hidden?: boolean | null;
};

/** The slice of the fan page's `#pagedata` blob the site reads. */
type FanPageData = {
  item_cache?: { collection?: Record<string, CollectionItem> };
  /** Collection item keys in display order, newest purchase first. */
  collection_data?: { sequence?: string[] };
};

const PAGE_DATA_BLOB = /id="pagedata"[^>]*data-blob="([^"]*)"/;
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

/** Decodes the entities Bandcamp uses when it escapes JSON into an HTML attribute. */
function decodeAttribute(value: string): string {
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (entity, body: string) => {
      if (body.startsWith("#x") || body.startsWith("#X"))
        return String.fromCodePoint(Number.parseInt(body.slice(2), 16));
      if (body.startsWith("#"))
        return String.fromCodePoint(Number(body.slice(1)));
      return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
    },
  );
}

function toIso(purchased: string | null | undefined): string | null {
  if (!purchased) return null;
  const time = Date.parse(purchased);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

/** Parses the collection embedded in a Bandcamp fan page into purchases, newest first. */
export function parseFanPage(html: string): Purchase[] {
  const blob = PAGE_DATA_BLOB.exec(html)?.[1];
  if (!blob) return [];
  const data = JSON.parse(decodeAttribute(blob)) as FanPageData;

  const collection = data.item_cache?.collection ?? {};
  const sequence = data.collection_data?.sequence ?? Object.keys(collection);

  const purchases: Purchase[] = [];
  for (const key of sequence) {
    const item = collection[key];
    if (!item || item.hidden) continue;
    const purchasedAt = toIso(item.purchased);
    if (!item.item_title || !item.band_name || !item.item_url || !purchasedAt)
      continue;
    purchases.push({
      title: item.item_title,
      artist: item.band_name,
      url: item.item_url,
      purchasedAt,
    });
  }
  return purchases.toSorted((a, b) =>
    b.purchasedAt.localeCompare(a.purchasedAt),
  );
}

/**
 * Fetches a page the way Bandcamp's app does: a bare request carrying only the user agent. The
 * extra defaults `fetch` adds (`sec-fetch-mode`, `accept-language`) make Bandcamp answer every
 * other request with its bot challenge instead of the page.
 */
function fetchPage(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const request = get(
      url,
      {
        headers: {
          "User-Agent": BANDCAMP_USER_AGENT,
          "Accept-Encoding": "gzip",
        },
      },
      (response) => {
        const stream =
          response.headers["content-encoding"] === "gzip"
            ? response.pipe(createGunzip())
            : response;
        const chunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () =>
          resolve({
            status: response.statusCode ?? 0,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    request.on("error", reject);
  });
}

export async function getRecentPurchases(
  limit = RECENT_VINYL_LIMIT,
): Promise<Purchase[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("bandcamp-purchases");

  // Errors thrown inside a cached function fail the prerender even if the caller catches them,
  // so a renamed handle, a Bandcamp outage, or a changed page layout degrades to "no row" here.
  try {
    const { status, body } = await fetchPage(BANDCAMP_FAN_URL);
    if (status !== 200) throw new Error(`Bandcamp responded ${status}`);
    return parseFanPage(body).slice(0, limit);
  } catch (error) {
    console.error(
      "getRecentPurchases: could not load Bandcamp collection",
      error,
    );
    return [];
  }
}
