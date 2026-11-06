import { Group, Stack } from "@uiid/design-system";

import { SPACING_SM } from "@/constants/ui";
import { getRecentPurchases, type Purchase } from "@/lib/bandcamp";
import { formatHomeDate } from "@/lib/format";

import { HobbiesText } from "@/components/shared/hobbies-text";

type PurchaseRowProps = { purchase: Purchase; className?: string };

function PurchaseRow({ purchase, className }: PurchaseRowProps) {
  return (
    <Group gap={SPACING_SM} ay="center" className={className}>
      <HobbiesText
        weight="bold"
        render={<a href={purchase.url} target="_blank" />}
      >
        {purchase.title},
      </HobbiesText>
      <HobbiesText>{purchase.artist},</HobbiesText>
      <HobbiesText>{formatHomeDate(purchase.purchasedAt)}</HobbiesText>
    </Group>
  );
}

export async function RecentPurchases() {
  const [latest, ...earlier] = await getRecentPurchases();
  if (!latest) return null;

  return (
    <Group gap={SPACING_SM} ay="start">
      <HobbiesText render={<h4 />} weight="bold" className="min-w-8">
        MP3:
      </HobbiesText>
      <Stack>
        <PurchaseRow purchase={latest} />
        {earlier.map((purchase) => (
          <PurchaseRow
            key={purchase.url}
            purchase={purchase}
            className="opacity-50"
          />
        ))}
      </Stack>
    </Group>
  );
}
