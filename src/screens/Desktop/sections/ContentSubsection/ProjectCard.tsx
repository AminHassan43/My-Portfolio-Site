import { Link } from "react-router-dom";
import type { HomeProject } from "../../homeData";

interface ProjectCardProps {
  project: HomeProject;
}

const hexToRgb = (hex: string): string => {
  const value = hex.replace("#", "");
  if (!/^[\da-f]{6}$/i.test(value)) {
    return "18, 18, 18";
  }

  const color = Number.parseInt(value, 16);
  return `${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}`;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const titleId = `${project.id}-title`;
  const dateId = `${project.id}-date`;
  const isInteractive = Boolean(project.url && !project.isDraft);
  const gradientRgb = hexToRgb(project.gradientColor ?? "#121212");
  const cardContent = (
    <article
      className="case-study-card relative aspect-video w-full transform-gpu overflow-hidden rounded-[20px] bg-[#1b1d20] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:[transform:rotateZ(-0.65deg)] group-focus-visible:[transform:rotateZ(-0.65deg)] group-hover:shadow-[0_24px_60px_-30px_rgba(18,18,18,0.55)] motion-reduce:transform-none motion-reduce:transition-none"
      aria-labelledby={titleId}
      aria-describedby={dateId}
    >
      {project.image ? (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          alt={project.imageAlt ?? ""}
          src={project.image}
        />
      ) : (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.13),transparent_34%),linear-gradient(145deg,#24272c_0%,#17191c_100%)]"
          aria-hidden="true"
        />
      )}

      {project.logo && (
        <div className="absolute left-6 top-6 z-20 h-10 w-[112px] sm:left-8 sm:top-8 sm:h-12 sm:w-[128px] md:left-10 md:top-10">
          <img
            className="h-full w-full object-contain object-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            src={project.logo}
            alt={project.logoAlt ?? ""}
          />
        </div>
      )}

      <div
        className="absolute -inset-[4%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-[1.5%] group-hover:translate-y-[1.5%] group-focus-visible:translate-x-[1.5%] group-focus-visible:translate-y-[1.5%] motion-reduce:transform-none motion-reduce:transition-none"
        style={{
          background: `linear-gradient(0deg, rgba(18, 18, 18, 0.58) 0%, rgba(18, 18, 18, 0.1) 54%, transparent 76%), linear-gradient(90deg, rgba(${gradientRgb}, 0.96) 0%, rgba(${gradientRgb}, 0.76) 34%, rgba(${gradientRgb}, 0.22) 64%, transparent 82%)`,
        }}
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 z-10 flex max-w-[90%] flex-col items-start gap-1.5 p-6 sm:p-8 md:p-10">
        <h3
          id={titleId}
          className="[font-family:'Space_Mono',monospace] text-[20px] font-bold leading-[1.25] tracking-[-0.7px] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]"
        >
          {project.title}
        </h3>
        <p
          id={dateId}
          className="m-0 [font-family:'Space_Mono',monospace] text-[16px] font-normal leading-normal tracking-[-0.56px] text-white/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]"
        >
          {project.dateLabel}
        </p>
      </div>
    </article>
  );

  if (!isInteractive || !project.url) {
    return <div className="group block w-full">{cardContent}</div>;
  }

  const isExternal = project.url.startsWith("http");
  const wrapperClass =
    "group block w-full rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-4";

  if (isExternal) {
    return (
      <a
        href={project.url}
        download={project.downloadFileName}
        className={wrapperClass}
        aria-label={`Download ${project.title} PDF case study`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={project.url}
      className={wrapperClass}
    >
      {cardContent}
    </Link>
  );
};
