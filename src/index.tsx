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

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
