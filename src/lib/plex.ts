import {
  PLEX_CLIENT_IDENTIFIER,
  PLEX_SERVER_MACHINE_ID,
  PLEX_TV_RESOURCES_URL,
} from "@/constants/plex";

type PlexConnection = { protocol: string; uri: string; local: boolean; relay: boolean };
type PlexResource = { clientIdentifier: string; provides: string; connections: PlexConnection[] };

function plexHeaders(): HeadersInit {
  const token = process.env.PLEX_TOKEN;
  if (!token) throw new Error("PLEX_TOKEN is not set");
  return {
    Accept: "application/json",
    "X-Plex-Token": token,
    "X-Plex-Client-Identifier": PLEX_CLIENT_IDENTIFIER,
  };
}

/**
 * Longest to wait for one Plex response. A busy NAS can take far longer, and a cached function
 * that outlasts the prerender deadline fails the whole build, so give up and show no rows.
 */
const PLEX_TIMEOUT_MS = 10_000;

async function plexJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: plexHeaders(),
    signal: AbortSignal.timeout(PLEX_TIMEOUT_MS),
  });
  if (!response.ok)
    throw new Error(`Plex responded ${response.status} for ${new URL(url).pathname}`);
  return (await response.json()) as T;
}

/**
 * Resolves the NAS's current public plex.direct address via plex.tv, so a changed home IP never
 * breaks the site. Prefers a direct remote connection and falls back to Plex's relay.
 */
export async function getPlexServerUrl(): Promise<string> {
  const resources = await plexJson<PlexResource[]>(PLEX_TV_RESOURCES_URL);
  const server = resources.find(
    (resource) =>
      resource.provides === "server" && resource.clientIdentifier === PLEX_SERVER_MACHINE_ID,
  );
  if (!server) throw new Error("Plex server not found in plex.tv resources");

  const https = server.connections.filter((connection) => connection.protocol === "https");
  const connection =
    https.find((candidate) => !candidate.local && !candidate.relay) ??
    https.find((candidate) => candidate.relay);
  if (!connection) throw new Error("Plex server has no remote connection");

  return connection.uri;
}

/** Fetches a JSON endpoint on the server and unwraps Plex's MediaContainer envelope. */
export async function getPlexContainer<T>(serverUrl: string, path: string): Promise<T> {
  const json = await plexJson<{ MediaContainer: T }>(`${serverUrl}${path}`);
  return json.MediaContainer;
}
