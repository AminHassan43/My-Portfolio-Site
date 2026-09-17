import { ContentSubsection } from "./sections/ContentSubsection/ContentSubsection";
import { NavBarSubsection } from "./sections/NavBarSubsection/NavBarSubsection";
import headerBackground from "../../assets/header-background.png";

export const Desktop = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen">
      <div className="bg-white w-full">
        <div className="relative">
          <div className="header-bg absolute inset-0 w-full h-[1200px] md:h-[801px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${headerBackground}')`}}></div>
          <div className="absolute inset-0 w-full h-[1200px] md:h-[801px] bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>

          <div className="flex flex-col w-full max-w-[1318px] items-center gap-[60px] md:gap-[435px] relative mx-auto px-4 md:px-8 pt-[220px] md:pt-[496px]">
            <NavBarSubsection />
            <ContentSubsection />
          </div>
        </div>
      </div>
    </div>
  );
};
