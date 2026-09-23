import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Desktop } from "./screens/Desktop";
import { LightbulbProject } from "./screens/LightbulbProject/LightbulbProject";
import { BreeProject } from "./screens/BreeProject";
import { TeslaProject } from "./screens/TeslaProject";
import { Photography } from "./screens/Photography";
import { SportsDesign } from "./screens/SportsDesign";
import { SmoothCursor } from "./components/SmoothCursor";

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
