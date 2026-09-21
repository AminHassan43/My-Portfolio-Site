import teslaOffPeakCard from "../../assets/tesla-off-peak-card.jpg";
import teslaIconmark from "../../assets/tesla-iconmark.svg";
import brilliantCard from "../../assets/brilliant-card.jpg";
import brilliantLogo from "../../assets/brilliant-logo.png";
import breeCard from "../../assets/bree-card.jpg";
import breeLogo from "../../assets/bree-logo.png";
import amdArrowmark from "../../assets/amd-arrowmark.svg";
import amexLogo from "../../assets/amex-logo-1.png";
import northPoleHoopsLogo from "../../assets/nph-logo-1.png";

export interface HomeProject {
  id: string;
  navTitle: string;
  title: string;
  dateLabel: string;
  image?: string;
  imageAlt?: string;
  logo?: string;
  logoAlt?: string;
  gradientColor?: string;
  url?: string;
  downloadFileName?: string;
  isDraft?: boolean;
}

export const HOME_PROJECTS: HomeProject[] = [
  {
    id: "project-tesla",
    navTitle: "Tesla",
    title: "Tesla Off-Peak Charging",
    dateLabel: "2025",
    image: teslaOffPeakCard,
    imageAlt: "Three dark-mode Tesla Off-Peak Charging app screens",
    logo: teslaIconmark,
    logoAlt: "Tesla iconmark",
    gradientColor: "#121212",
    url: "https://drive.google.com/uc?export=download&id=1NPkNVUlUSgGuH8CGI98jSCdXpl_hW73m",
    downloadFileName: "Tesla Off-Peak Charging Concept Case Study.pdf",
  },
  {
    id: "project-brilliant",
    navTitle: "Brilliant.org",
    title: "Designing Brilliant.org's Progress Dashboard",
    dateLabel: "2025",
    image: brilliantCard,
    imageAlt: "Brilliant.org progress dashboard shown across mobile and desktop",
    logo: brilliantLogo,
    logoAlt: "Brilliant.org",
    gradientColor: "#FF8C23",
    url: "https://drive.google.com/uc?export=download&id=1Sv02Pg8zGMrY19Tq1HUXaLedsSMrTomN",
    downloadFileName: "Brilliant Progress UI Concept.pdf",
  },
  {
    id: "project-bree",
    navTitle: "Bree",
    title: "Auditing Bree's Rewards Tab",
    dateLabel: "2025",
    image: breeCard,
    imageAlt: "Bree rewards offers displayed on a mobile interface",
    logo: breeLogo,
    logoAlt: "Bree",
    gradientColor: "#2F77F2",
    url: "https://drive.google.com/uc?export=download&id=1Fy-1M2U6MHbj_DZkjDcOvFlyEpWfD2UK",
    downloadFileName: "Bree Mini Case Study.pdf",
  },
];

export interface ExperienceRole {
  id: string;
  company: string;
  companyBadge: string;
  role: string;
  duration: string;
  description: string;
  logo: string;
  logoAlt: string;
}

export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    id: "amd-product-design",
    company: "AMD",
    companyBadge: "AMD (Advanced Micro Devices)",
    role: "Product Design Intern",
    duration: "Sep 2026 – Present",
    description:
      "Modernizing AMD Adrenaline with a more consistent user experience and AMD chat in mind.",
    logo: amdArrowmark,
    logoAlt: "AMD arrowmark",
  },
  {
    id: "amex-digital-capability",
    company: "AMEX",
    companyBadge: "American Express",
    role: "Digital Capability Intern",
    duration: "Jan 2026 – Apr 2026",
    description:
      "Selected to intern on the global AMEX Acquisition Accelration Project",
    logo: amexLogo,
    logoAlt: "American Express logo",
  },
  {
    id: "amex-product-data",
    company: "AMEX",
    companyBadge: "American Express",
    role: "Product & Data Intern",
    duration: "Jan 2025 – Apr 2025",
    description:
      "Investigated retention journeys using Python and SQL under the Data & Retention team, uncovered a $500K revenue leakage in my time",
    logo: amexLogo,
    logoAlt: "American Express logo",
  },
  {
    id: "north-pole-hoops",
    company: "NorthPoleHoops",
    companyBadge: "NorthPoleHoops",
    role: "Head of Design & Product",
    duration: "Apr 2021 – Nov 2022",
    description:
      "Led a cross-functional team to ship multiple digital campagins, design systems, and cut turnaround time by 40%",
    logo: northPoleHoopsLogo,
    logoAlt: "NorthPoleHoops logo",
  },
];

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/dimedetail",
    iconPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/amin-elsubki-hassan-5451191b7/",
    iconPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@dimedetail",
    iconPath:
      "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
] as const;
