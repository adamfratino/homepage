import { FileTextIcon, type Icon } from "@uiid/design-system/icons";

import { GithubIcon, LinkedinIcon } from "@/components/shared/brand-icons";

type PersonalLink = {
  label: string;
  href: string;
  icon?: Icon;
};

export const RESUME_LINK: PersonalLink = {
  label: "Resume",
  href: "/docs/resume.pdf",
  icon: FileTextIcon,
};

export const GITHUB_LINK: PersonalLink = {
  label: "Github",
  href: "https://github.com/adamfratino",
  icon: GithubIcon,
};

export const LINKEDIN_LINK: PersonalLink = {
  label: "LinkedIn",
  href: "https://www.linkedin.com/in/adam-fratino-a26868311/",
  icon: LinkedinIcon,
};

export const CARGO_LINK: PersonalLink = {
  label: "cargo",
  href: "https://cargocollective.com/adamfratino",
};

export const PERSONAL_LINKS: PersonalLink[] = [
  LINKEDIN_LINK,
  GITHUB_LINK,
  RESUME_LINK,
];

export const SVA_URL = "https://sva.edu";
export const BARBARIAN_URL = "https://www.wearebarbarian.com";
export const ROKKAN_URL = "https://www.linkedin.com/company/rokkan/home";
export const PELOTON_URL = "https://www.onepeloton.com";
export const TABS_URL = "https://www.tabs.com";

export const UIID_URL = "https://github.com/uiid-systems/design-system";
export const GAMMONCAMP_URL = "https://gammon.camp";
export const BERTRAND_URL = "https://github.com/uiid-systems/bertrand";
export const ELO_CEELO_URL = "https://eloceelo.com";
