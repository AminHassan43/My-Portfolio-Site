import { ContentSubsection } from "./sections/ContentSubsection/ContentSubsection";
import { CollapsingHero } from "./sections/CollapsingHero/CollapsingHero";
import headerBackground from "../../assets/header-background.png";

export const Desktop = (): JSX.Element => {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-white">
      <div
        className="header-background pointer-events-none absolute inset-x-0 top-0 h-[1000px] bg-cover bg-center bg-no-repeat min-[900px]:h-[900px]"
        style={{ backgroundImage: `url('${headerBackground}')` }}
        aria-hidden="true"
      />
      <div
        className="header-gradient pointer-events-none absolute inset-x-0 top-0 h-[1000px] w-full bg-gradient-to-b from-transparent via-white/20 to-white min-[900px]:h-[900px]"
        aria-hidden="true"
      />

      <CollapsingHero>
        <ContentSubsection />
      </CollapsingHero>
    </div>
  );
};
