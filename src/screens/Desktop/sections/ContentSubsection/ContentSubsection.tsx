import { ProjectCard } from "./ProjectCard";
import { MoreWorkFolder } from "./MoreWorkFolder";
import { HOME_PROJECTS } from "../../homeData";

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

export const ContentSubsection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[1292px] items-center gap-[40px] md:gap-[68px] flex flex-col relative px-4 md:px-0">
      <div
        id="projects"
        className="case-study-grid grid grid-cols-1 gap-[30px] relative self-stretch w-full max-w-[1318px] mx-auto"
        data-section="projects"
      >
        {HOME_PROJECTS.map((project) => (
          <section
            key={project.id}
            id={project.id}
            className="case-study-item w-full"
            aria-label={`${project.title}, ${project.dateLabel}`}
            data-case-study
          >
            <ProjectCard project={project} />
          </section>
        ))}
      </div>

      <section className="flex w-full max-w-[1180px] flex-col items-start gap-10 md:gap-12">
        <h2 className="m-0 [font-family:'Space_Mono',monospace] text-[16px] font-normal leading-[1.4] tracking-[-0.56px] text-[#121212]">
          here is some more of my creative work :)
        </h2>

        <div className="more-work-grid relative mx-auto grid w-full grid-cols-1 items-start justify-center justify-items-center gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {MORE_WORK_CATEGORIES.map((category) => (
            <MoreWorkFolder key={category.name} category={category} />
          ))}
        </div>
      </section>

      <footer className="footer-container relative flex w-full max-w-[1180px] items-start bg-transparent pb-16">
        <p className="m-0 [font-family:'Space_Mono',monospace] text-[16px] font-normal leading-[1.4] tracking-[-0.56px] text-[#121212]">
          fin.
        </p>
      </footer>
    </div>
  );
};
