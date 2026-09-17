import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";
import { useState } from "react";

interface Project {
  image: string;
  hoverImage?: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  url: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExternal = project.url.startsWith('http');

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Define content as a variable, not a component, to avoid remounts
  const cardContent = (
    <Card className="project-card flex flex-col items-start gap-4 p-5 md:p-[38px] relative rounded-3xl border-[3px] border-[rgba(186,186,186,0.81)] w-full overflow-hidden group transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:[transform:perspective(1000px)_rotateY(8deg)]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-[linear-gradient(270deg,#D0D0D0_0%,#FFFFFF_100%)] opacity-0 group-hover:opacity-65 transition-opacity duration-300 ease-in-out rounded-3xl"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out"></div>
      
      <CardContent className="p-0 relative z-10 w-full">
        <div className="relative w-full h-auto md:h-[219px]">
            {/* Base Image - Always visible underneath */}
            <img
              className="project-image relative w-full h-auto md:h-full object-cover rounded-t-[14px]"
              alt={project.title}
              src={project.image}
            />
            
            {/* Hover Image - Fades in on top */}
            {project.hoverImage && (
              <img
                className={cn(
                  "project-image absolute inset-0 w-full h-full object-cover rounded-t-[14px] transition-opacity ease-in-out",
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
                style={{ transitionDuration: '400ms' }}
                alt={`${project.title} Hover`}
                src={project.hoverImage}
              />
            )}
        </div>
        
        <div className="flex flex-col items-start gap-[5px] relative self-stretch w-full mt-4">
          <div className="project-title relative self-stretch mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-normal text-black text-2xl md:text-[32px] tracking-[-1px] md:tracking-[-1.28px] leading-[normal]">
            <span className="font-semibold tracking-[-0.41px]">{project.title} </span>
            <span className="font-light tracking-[-0.41px]">{project.subtitle}</span>
          </div>
          <div className="project-meta flex w-full items-center gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-light text-black text-lg md:text-xl tracking-[-0.80px] leading-[normal] whitespace-nowrap">
              {project.category}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#BABABA] to-[#BABABA] relative"></div>
            <div className="relative w-fit mt-[-1.00px] [font-family:'Bricolage_Grotesque',Helvetica] font-light text-black text-lg md:text-xl text-right tracking-[-0.80px] leading-[normal] whitespace-nowrap">
              {project.status}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const wrapperClass = "block w-full max-w-[631px] mx-auto";
  
  const wrapperProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };

  if (project.title === "Masaajid") {
     return (
         <div className={wrapperClass} data-project="masaajid" {...wrapperProps}>
            {cardContent}
         </div>
     )
  }

  return (
    <Link
      to={project.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={wrapperClass}
      {...wrapperProps}
    >
      {cardContent}
    </Link>
  );
};
