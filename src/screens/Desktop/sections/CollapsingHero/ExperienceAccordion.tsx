import { useState } from "react";
import { cn } from "../../../../lib/utils";
import { EXPERIENCE_ROLES } from "../../homeData";

interface ExperienceAccordionProps {
  idPrefix: string;
  tabIndex?: number;
}

export const ExperienceAccordion = ({
  idPrefix,
  tabIndex = 0,
}: ExperienceAccordionProps): JSX.Element => {
  const [openRoleId, setOpenRoleId] = useState<string | null>(null);
  const supportsHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  return (
    <section className="experience-accordion" aria-label="Experience">
      {EXPERIENCE_ROLES.map((experience) => {
        const isOpen = openRoleId === experience.id;
        const triggerId = `${idPrefix}-${experience.id}-trigger`;
        const panelId = `${idPrefix}-${experience.id}-panel`;

        return (
          <div
            key={experience.id}
            className={cn("experience-item", isOpen && "is-open")}
            data-company={experience.company}
            onMouseEnter={() => {
              if (supportsHover()) {
                setOpenRoleId(experience.id);
              }
            }}
            onMouseLeave={(event) => {
              if (
                supportsHover() &&
                !event.currentTarget.querySelector(":focus-visible")
              ) {
                setOpenRoleId((currentRoleId) =>
                  currentRoleId === experience.id ? null : currentRoleId,
                );
              }
            }}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setOpenRoleId((currentRoleId) =>
                  currentRoleId === experience.id ? null : currentRoleId,
                );
              }
            }}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={`${experience.companyBadge}, ${experience.role}, ${experience.duration}`}
                tabIndex={tabIndex}
                onFocus={() => {
                  if (supportsHover()) {
                    setOpenRoleId(experience.id);
                  }
                }}
                onClick={() => {
                  if (!supportsHover()) {
                    setOpenRoleId((currentRoleId) =>
                      currentRoleId === experience.id
                        ? null
                        : experience.id,
                    );
                  }
                }}
              >
                <span className="experience-company">
                  <span className="experience-logo">
                    <img src={experience.logo} alt={experience.logoAlt} />
                    <span
                      className="experience-company-badge"
                      aria-hidden="true"
                    >
                      {experience.companyBadge}
                    </span>
                  </span>
                </span>
                <span className="experience-role">{experience.role}</span>
                <span className="experience-duration">
                  {experience.duration}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              className="experience-expansion"
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
            >
              <div>
                <p>{experience.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
