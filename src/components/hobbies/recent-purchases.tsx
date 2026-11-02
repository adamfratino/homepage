import { Group, Separator, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { getRecentPurchases, type Purchase } from "@/lib/bandcamp";
import { formatHomeDate } from "@/lib/format";

import { MonoText } from "@/components/shared/mono-text";

type PurchaseRowProps = { purchase: Purchase; className?: string };

function PurchaseRow({ purchase, className }: PurchaseRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <MonoText weight="bold" render={<a href={purchase.url} target="_blank" />}>
        {purchase.title}
      </MonoText>
      <Separator orientation="vertical" />
      <MonoText>{purchase.artist}</MonoText>
      <Separator orientation="vertical" />
      <MonoText>{formatHomeDate(purchase.purchasedAt)}</MonoText>
    </Group>
  );
}

/** "MP3:" beside the most recent Bandcamp purchase, with the one before it dimmed underneath. */
export async function RecentPurchases() {
  const [latest, ...earlier] = await getRecentPurchases();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <MonoText render={<h4 />} weight="bold">
        MP3:
      </MonoText>
      <Stack>
        <PurchaseRow purchase={latest} />
        {earlier.map((purchase) => (
          <PurchaseRow key={purchase.url} purchase={purchase} className="opacity-50" />
        ))}
      </Stack>
    </Group>
  );
}
