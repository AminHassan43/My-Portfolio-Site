import { Separator } from "../../../../components/ui/separator";
import { SocialLink } from "./SocialLinks";
import { GradientButton } from "./GradientButton";
import { ProjectCard } from "./ProjectCard";
import { CompanyLogo } from "./CompanyLogo";
import { MoreWorkFolder } from "./MoreWorkFolder";
import { AboutImage } from "./AboutImage";

import preview from "../../../../assets/preview.svg";
import teslaPreview from "../../../../assets/tesla-preview.jpg";
import teslaPreviewHover from "../../../../assets/tesla-preview-hover.jpg";
import lightbulbPreview from "../../../../assets/lightbulb-preview.jpg";
import lightbulbPreviewHover from "../../../../assets/lightbulb-preview-hover.jpg";
import breePreview from "../../../../assets/bree-preview.jpg";
import breePreviewHover from "../../../../assets/bree-preview-hover.jpg";
import compressedPhotography1 from "../../../../assets/compressed-photography-1.jpg";
import compressedPhotography2 from "../../../../assets/compressed-photography-2.jpg";
import compressedPhotography3 from "../../../../assets/compressed-photography-3.jpg";
import compressedSports1 from "../../../../assets/compressed-sports-1.jpg";
import compressedSports2 from "../../../../assets/compressed-sports-2.jpg";
import compressedSports3 from "../../../../assets/compressed-sports-3.jpg";
import branding1 from "../../../../assets/branding-1.jpg";
import branding2 from "../../../../assets/branding-2.jpg";
import branding3 from "../../../../assets/branding-3.jpg";
import presentation1 from "../../../../assets/presentation-1.jpg";
import presentation2 from "../../../../assets/presentation-2.jpg";
import presentation3 from "../../../../assets/presentation-3.jpg";
import universityOfWaterlooSeal from "../../../../assets/University_of_Waterloo_seal.svg";
import laurierUnivCaSeal from "../../../../assets/Laurier_univ_ca_seal.png";
import amexLogo1 from "../../../../assets/amex-logo-1.png";
import nphLogo1 from "../../../../assets/nph-logo-1.png";
import line21 from "../../../../assets/line-2-1.svg";
import line22 from "../../../../assets/line-2-2.svg";
import image2025 from "../../../../assets/2025-08-15-20-00-16-149-1.png";
import aboutme2 from "../../../../assets/aboutme-2.png";
import aboutme3 from "../../../../assets/aboutme-3.png";

const PROJECT_CARDS = [
  {
    image: preview,
    title: "Masaajid",
    subtitle: "- Mosque Network App",
    category: "UI/UX | Personal Project",
    status: "Currently Itterating",
    url: "https://example.com/masaajid",
  },
  {
    image: teslaPreview,
    hoverImage: teslaPreviewHover,
    title: "Tesla",
    subtitle: "- Off-Peak Charging",
    category: "Product Design | Case Study",
    status: "2025",
    url: "/tesla",
  },
  {
    image: lightbulbPreview,
    hoverImage: lightbulbPreviewHover,
    title: "Lightbulb",
    subtitle: "- Social Media App",
    category: "UI/UX | Design Competition",
    status: "2024",
    url: "/lightbulb",
  },
  {
    image: breePreview,
    hoverImage: breePreviewHover,
    title: "Bree",
    subtitle: "- Mini UX Case Study",
    category: "UI/UX | Personal Project",
    status: "2025",
    url: "/bree",
  },
];

const MORE_WORK_CATEGORIES = [
  {
    name: "Photography",
    images: [compressedPhotography1, compressedPhotography2, compressedPhotography3],
    url: "/photography"
  },
  {
    name: "Sports Design", 
    images: [compressedSports1, compressedSports2, compressedSports3],
    url: "/sports-design"
  },
  {
    name: "Branding",
    images: [branding1, branding2, branding3]
  },
  {
    name: "Case Competitions",
    images: [presentation1, presentation2, presentation3]
  }
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/dimedetail",
    iconPath: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
  },
  {
    href: "https://linkedin.com/in/amin-elsubki-hassan-5451191b7/",
    iconPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  },
  {
    href: "https://www.tiktok.com/@dimedetail",
    iconPath: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
  }
];

export const ContentSubsection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[1292px] items-center gap-[40px] md:gap-[68px] flex flex-col relative px-4 md:px-0">
      <div className="flex flex-col w-full max-w-[1280px] items-center md:items-start gap-6 md:gap-10 relative">
    <header className="hero-container flex flex-col md:flex-row items-center md:items-start md:justify-between relative self-stretch w-full bg-transparent gap-6 md:gap-0">
      <div className="flex flex-col items-center md:flex-row md:items-center relative text-center md:text-left w-full md:w-auto gap-0 md:gap-6">
        <h1 className="relative w-fit md:self-start [font-family:'Bricolage_Grotesque',Helvetica] font-bold text-[48px] leading-[1.1] md:text-8xl tracking-[-2px] md:tracking-[-3.84px] whitespace-nowrap mr-0 md:mr-6">
          <span className="md:hidden">Welcome!</span>
          <span className="hidden md:inline">Hi!</span>
        </h1>
        <h1 className="relative w-fit md:self-start [font-family:'Bricolage_Grotesque',Helvetica] font-light text-[48px] leading-[1.1] md:text-8xl tracking-[-2px] md:tracking-[-3.84px] whitespace-nowrap">
          I&apos;m Amin Hassan
        </h1>
      </div>
      <div className="social-icons flex items-center justify-center md:justify-start gap-6 w-full md:w-auto">
        {SOCIAL_LINKS.map((link, index) => (
          <SocialLink key={index} {...link} />
        ))}
      </div>
    </header>

    <Separator className="relative self-stretch w-full h-0.5" />

    <div className="description-text relative self-stretch [font-family:'Bricolage_Grotesque',Helvetica] font-normal text-xl md:text-[32px] tracking-[-0.5px] md:tracking-[-1.28px] leading-[1.4] md:leading-[normal] text-center md:text-left">
      <span className="font-light tracking-[-0.41px]">
            I am a designer who thrives on streching my creative skillset across different mediums and audiences. Studying a double major of{" "}
          </span>
          <span className="font-semibold tracking-[-0.41px]">CS @ Waterloo &amp; BBA @ Wilfrid Laurier</span>
          <span className="font-light tracking-[-0.41px]">
            , my goal is to combine the technical, creative, and human sides to solve real problems.
          </span>
        </div>

        <div className="badge-company-container flex flex-col md:flex-row items-center justify-between relative self-stretch w-full gap-8 md:gap-0">
          <GradientButton 
            onClick={() => window.location.href = 'mailto:a26hassa@uwaterloo.ca'}
            className="px-[30px] py-3 w-full md:w-auto order-1 md:order-none"
          >
            <span className="relative [font-family:'Bricolage_Grotesque',Helvetica] font-normal text-[#303030] text-lg md:text-2xl tracking-[-0.96px] leading-[normal]">
              <span className="font-light tracking-[-0.23px]">Looking for </span>
              <span className="font-semibold tracking-[-0.23px]">Winter 2026</span>
              <span className="font-light tracking-[-0.23px]"> Internships</span>
            </span>
          </GradientButton>

          <div className="flex flex-row md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto justify-center md:justify-end order-2 md:order-none flex-wrap md:flex-nowrap">
            <div className="company-logos flex flex-row items-center justify-center md:justify-start gap-4 md:gap-[25px] relative w-auto md:w-auto">
              <div className="relative w-fit [font-family:'Open_Sans',Helvetica] font-light text-black text-xl md:text-2xl tracking-[-0.96px] leading-[normal] whitespace-nowrap">
                Studying at
              </div>
              <div className="flex items-center gap-6">
                  <CompanyLogo
                  src={universityOfWaterlooSeal}
                      alt="UWaterloo logo"
                  role="Bachelor's of Computer Science"
                  period="2028"
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                  />
                  <CompanyLogo
                  src={laurierUnivCaSeal}
                      alt="Laurier logo"
                  role="Bachelor's of Business Administration"
                  period="2028"
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain"
                  />
              </div>
            </div>

            <div className="h-8 w-[1px] bg-gray-300 hidden md:block"></div>

            <div className="company-logos flex flex-row items-center justify-center md:justify-start gap-4 md:gap-[25px] relative w-auto md:w-auto">
              <div className="relative w-fit [font-family:'Open_Sans',Helvetica] font-light text-black text-xl md:text-2xl tracking-[-0.96px] leading-[normal] whitespace-nowrap">
                Previously at
              </div>
              <div className="flex items-center gap-6">
                  <CompanyLogo
                  src={amexLogo1}
                      alt="Amex logo"
                  role="Product Manager Intern"
                  period="Winter 2025"
                  className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                  />
                  <CompanyLogo
                  src={nphLogo1}
                      alt="Nph logo"
                  role="Head of Product & Design"
                  period="2022"
                  className="w-[32px] h-[40px] md:w-10 md:h-[50px]"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] relative self-stretch w-full max-w-[1318px] mx-auto" data-section="projects">
        {PROJECT_CARDS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div className="flex items-center gap-[30px] relative w-full max-w-[1252px] mx-auto overflow-hidden">
        <GradientButton className="px-[40px] md:px-[60px] py-2.5 flex-shrink-0">
          <div className="relative w-fit mt-[-2.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-light text-[#303030] text-xl md:text-2xl tracking-[-0.96px] leading-[normal]">
            About Me
          </div>
        </GradientButton>
        <div className="flex-1 min-w-0">
          <img className="relative h-0.5 w-full" alt="Line" src={line21} />
        </div>
      </div>

      <div className="about-container flex flex-col lg:flex-row items-center gap-10 md:gap-20 relative w-full" data-section="about">
        <AboutImage 
          images={[
            {
              src: image2025,
              badge: { text: "PSG 2024/25 Fourth Kit", color: "#0e46a0" }
            },
            {
              src: aboutme2,
              badge: { text: "Manchester United 2008/09 Third Kit", color: "#DA291C" }
            },
            {
              src: aboutme3,
              badge: { text: "FC Barcelona X Cactus Jack 2024/25 Away Kit", color: "#A50044" }
            }
          ]}
          alt="Amin Hassan" 
        />
        <div className="about-text-container w-full lg:w-[772px] items-start gap-7 flex flex-col relative">
          <div className="about-title relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-normal text-black text-2xl md:text-[32px] tracking-[-1.28px] leading-[normal]">
            <span className="font-light tracking-[-0.41px]">Heyo! I&apos;m Amin, a </span>
            <span className="font-bold tracking-[-0.41px]">CS / BBA student at Waterloo &amp; Laurier</span>
            <span className="font-light tracking-[-0.41px]"> who loves anything at the intersection of product, design, and business.</span>
          </div>
          <div className="about-text relative self-stretch [font-family:'Bricolage_Grotesque',Helvetica] font-light text-black text-lg md:text-xl tracking-[-0.40px] leading-[normal]">
            I&apos;ve worn a lot of hats honestly, and that&apos;s what keeps me excited. I started in design, picked up photography, and later dove into product and technical problem-solving. For me it&apos;s about chasing curiosity, learning something new, adding it to my toolbelt, and finding how it all connects. I also love working and talking with people, and I find that by being a jack of all trades, I can communicate through many languages and make the work better.
          </div>
          <div className="about-text relative self-stretch [font-family:'Bricolage_Grotesque',Helvetica] font-light text-black text-lg md:text-xl tracking-[-0.40px] leading-[normal]">
            Outside of work, I spend most of my time with friends, whether that&apos;s hanging out, going to events, or playing sports like basketball and frisbee. I enjoy picking up new experiences, trying new things here and there, and just making the most out of life. You&apos;ll find me in a football jersey most of the time too :)
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[30px] relative w-full max-w-[1252px] mx-auto overflow-hidden">
        <GradientButton className="px-[30px] py-3 flex-shrink-0">
          <span className="relative [font-family:'Bricolage_Grotesque',Helvetica] font-light text-[#303030] text-xl md:text-2xl tracking-[-0.96px] leading-[normal]">
            Selected Works
          </span>
        </GradientButton>
        <div className="flex-1 min-w-0">
          <img className="relative h-0.5 w-full" alt="Line" src={line22} />
        </div>
      </div>

      <div className="more-work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1099px] items-center justify-items-center justify-center relative mx-auto">
        {MORE_WORK_CATEGORIES.map((category, index) => (
          <MoreWorkFolder key={index} category={category} />
        ))}
      </div>

      <footer className="footer-container inline-flex flex-col items-center gap-8 relative bg-transparent pb-16 w-full">
        <div className="footer-text relative w-full px-4 md:w-fit mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-light text-black text-xl md:text-2xl text-center tracking-[-0.96px] leading-[normal]">
          If you&apos;ve scrolled this far, you must have found some of this cool! So...
        </div>
        <div className="flex gap-[25px] self-stretch w-full items-center justify-center relative">
          <a href="mailto:a26hassa@uwaterloo.ca">
            <GradientButton className="px-[40px] md:px-[70px] py-[15px]">
              <div className="relative w-fit mt-[-2.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-light text-[#303030] text-2xl md:text-[40px] tracking-[-1.60px] leading-[normal] whitespace-nowrap">
                Let&apos;s connect!
              </div>
            </GradientButton>
          </a>
        </div>
      </footer>
    </div>
  );
};
