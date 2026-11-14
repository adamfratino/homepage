import { Text, Prose, List, ListItem } from "@uiid/design-system";

import { PROSE_LIST_OUTDENT, SPACING_BASE } from "@/constants/ui";
import { PERSONAL_LINKS } from "@/constants/links";
import { TITLE, DESCRIPTION } from "@/constants/copy";

import BioContent from "@/content/bio.mdx";
import SideProjectsContent from "@/content/side-projects.mdx";

import { LastUpdated } from "@/components/shared/last-updated";
import { MainLayout } from "@/components/shared/main-layout";
import { Section } from "@/components/shared/section";

import { RecentNotes } from "@/components/notes/recent-notes";

import {
  RecentGames,
  RecentMovies,
  RecentPurchases,
  RecentShows,
  RecentTracks,
} from "@/components/hobbies";

export default function Home() {
  return (
    <MainLayout
      title={TITLE}
      description={DESCRIPTION}
      footer={<LastUpdated />}
    >
      <Section title="Social">
        <List gap={SPACING_BASE}>
          {PERSONAL_LINKS.map((link) => (
            <ListItem
              key={link.href}
              icon={link.icon}
              label={<Text render={<a href={link.href} />}>{link.label}</Text>}
            />
          ))}
        </List>
      </Section>

      <Section title="Timeline">
        <Prose ml={PROSE_LIST_OUTDENT}>
          <BioContent />
        </Prose>
      </Section>

      <Section title="Side projects">
        <Prose ml={PROSE_LIST_OUTDENT}>
          <SideProjectsContent />
        </Prose>
      </Section>

      <Section title="Random thoughts">
        <RecentNotes />
      </Section>

      <Section title="Recent media">
        <RecentMovies />
        <RecentShows />
        <RecentTracks />
        <RecentPurchases />
      </Section>
      <Section title="Recent gaming">
        <RecentGames platform="ps5" />
        <RecentGames platform="ps2" />
        <RecentGames platform="psx" />
      </Section>
    </MainLayout>
  );
}
