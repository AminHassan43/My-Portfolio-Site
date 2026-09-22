import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Desktop } from "./screens/Desktop";
import { LightbulbProject } from "./screens/LightbulbProject/LightbulbProject";
import { BreeProject } from "./screens/BreeProject";
import { TeslaProject } from "./screens/TeslaProject";
import { Photography } from "./screens/Photography";
import { SportsDesign } from "./screens/SportsDesign";
import { SmoothCursor } from "./components/SmoothCursor";

const MOBILE_QUERY = "(max-width: 767px)";

const MobileNotice = () => (
  <main className="flex min-h-[100svh] w-full items-center justify-center bg-white px-6">
    <p className="intro-message-style mobile-notice-message">
      sorry, mobile view will be out soon. For now, check this out on your
      desktop :)
    </p>
  </main>
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const updateMobileView = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    query.addEventListener("change", updateMobileView);
    return () => query.removeEventListener("change", updateMobileView);
  }, []);

  return isMobile;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let secondFrame: number | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (!hash) {
          window.scrollTo({ top: 0, behavior: "auto" });
          return;
        }

        const target = document.getElementById(
          decodeURIComponent(hash.slice(1)),
        );
        target?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, [pathname, hash]);

  return null;
};

const App = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <SmoothCursor>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/lightbulb" element={<LightbulbProject />} />
          <Route path="/bree" element={<BreeProject />} />
          <Route path="/tesla" element={<TeslaProject />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/sports-design" element={<SportsDesign />} />
        </Routes>
      </BrowserRouter>
    </SmoothCursor>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
