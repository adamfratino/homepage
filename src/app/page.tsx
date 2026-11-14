import { Stack, Text, Prose, List, ListItem } from "@uiid/design-system";

import { SPACING_BASE, SPACING_MD, SPACING_SM } from "@/constants/ui";
import { PERSONAL_LINKS } from "@/constants/links";
import { TITLE, DESCRIPTION } from "@/constants/copy";

import BioContent from "@/content/bio.mdx";
import SideProjectsContent from "@/content/side-projects.mdx";

import { LastUpdated } from "@/components/shared/last-updated";
import { MainLayout } from "@/components/shared/main-layout";

import { RecentNotes } from "@/components/notes/recent-notes";

import {
  RecentGames,
  RecentMovies,
  RecentPurchases,
  RecentShows,
  RecentTracks,
} from "@/components/hobbies";

const PADDING_OUTER = SPACING_MD;

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
        <Prose>
          <BioContent />
        </Prose>
      </Section>

      <Section title="Side projects">
        <Prose>
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

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <Stack render={<section />} gap={SPACING_SM} ml={PADDING_OUTER}>
      <Text
        render={<h3 />}
        weight="bold"
        size={-1}
        emphasis="subtle"
        ml={PADDING_OUTER * -1}
      >
        {title}
      </Text>
      {children}
    </Stack>
  );
};
