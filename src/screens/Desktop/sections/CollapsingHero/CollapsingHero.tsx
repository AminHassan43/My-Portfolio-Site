import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { ArrowDown, Menu, X } from "lucide-react";
import { cn } from "../../../../lib/utils";
import ShirtRailHero from "../../../../components/shirt-rail/ShirtRailHero";
import { COLLAPSING_HERO_CONFIG } from "../../collapsingHeroConfig";
import { HOME_PROJECTS } from "../../homeData";
import { ExperienceAccordion } from "./ExperienceAccordion";
import "./collapsing-hero.css";

const EMAIL_ADDRESS = "a26hassa@uwaterloo.ca";
const RESUME_URL =
  "https://drive.google.com/file/d/1QsDZyWoQ18tmAgMGORpeoHjVCr_qjjxQ/view?usp=sharing";

const KitCollectionHint = () => (
  <p className="collapsing-hero-kit-hint">
    check out my football kit collection! click on any to learn more :)
  </p>
);

type CollapsingHeroStyle = CSSProperties & {
  "--desktop-hero-x": string;
  "--desktop-hero-blur": string;
  "--desktop-hero-opacity": number;
  "--desktop-rail-x": string;
  "--desktop-rail-opacity": number;
  "--mobile-bar-transition-ms": string;
  "--hero-fade-ms": string;
};

interface DesktopHandoffValues {
  heroX: number;
  heroBlur: number;
  heroOpacity: number;
  railX: number;
  railOpacity: number;
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

const easeOutBack = (progress: number, overshoot: number) => {
  const shiftedProgress = progress - 1;

  return (
    1 +
    (overshoot + 1) * Math.pow(shiftedProgress, 3) +
    overshoot * Math.pow(shiftedProgress, 2)
  );
};

const hasInitialDeepLink = () =>
  typeof window !== "undefined" &&
  Boolean(window.location.hash && window.location.hash !== "#top");

const getDesktopProgress = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  if (hasInitialDeepLink() && window.scrollY === 0) {
    return 1;
  }

  return clampProgress(
    window.scrollY / COLLAPSING_HERO_CONFIG.desktopHandoffDistance,
  );
};

const getDesktopHandoffValues = (
  progress: number,
  viewportWidth: number,
): DesktopHandoffValues => {
  const heroWidth = Math.min(
    450,
    Math.max(0, viewportWidth * 0.42 - 48),
  );
  const heroLeft = Math.max(32, (viewportWidth - 1318) / 2);
  const heroExitDistance = heroLeft + heroWidth + 80;
  const railHiddenOffset = 24 + 272;
  const heroExitProgress = Math.pow(progress, 1.35);
  const railEntryProgress = easeOutBack(
    progress,
    COLLAPSING_HERO_CONFIG.desktopRailOvershoot,
  );

  return {
    heroX: -heroExitDistance * heroExitProgress,
    heroBlur:
      COLLAPSING_HERO_CONFIG.desktopMaxBlurPx * heroExitProgress,
    heroOpacity: 1 - progress,
    railX: -railHiddenOffset * (1 - railEntryProgress),
    railOpacity: progress,
  };
};

const applyDesktopHandoff = (
  element: HTMLElement,
  progress: number,
) => {
  const values = getDesktopHandoffValues(progress, window.innerWidth);

  element.style.setProperty("--desktop-hero-x", `${values.heroX}px`);
  element.style.setProperty(
    "--desktop-hero-blur",
    `${values.heroBlur}px`,
  );
  element.style.setProperty(
    "--desktop-hero-opacity",
    String(values.heroOpacity),
  );
  element.style.setProperty("--desktop-rail-x", `${values.railX}px`);
  element.style.setProperty(
    "--desktop-rail-opacity",
    String(values.railOpacity),
  );
};

interface CollapsingHeroProps {
  children: ReactNode;
}

export const CollapsingHero = ({
  children,
}: CollapsingHeroProps): JSX.Element => {
  const [initialDesktopProgress] = useState(getDesktopProgress);
  const [initialHandoffValues] = useState(() =>
    getDesktopHandoffValues(
      initialDesktopProgress,
      typeof window === "undefined" ? 0 : window.innerWidth,
    ),
  );
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.scrollY > COLLAPSING_HERO_CONFIG.mobileExpandScrollY ||
      hasInitialDeepLink()
    );
  });
  const [isRailInteractive, setIsRailInteractive] = useState(
    initialDesktopProgress >=
      COLLAPSING_HERO_CONFIG.desktopInteractionHandoff,
  );
  const [isMotionReady, setIsMotionReady] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(
    HOME_PROJECTS[0].id,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handoffFrame: number | undefined;
    let deepLinkPending = hasInitialDeepLink() && window.scrollY === 0;
    const releaseDeepLinkTimer = window.setTimeout(() => {
      deepLinkPending = false;
      syncScrollState();
    }, 120);

    function syncScrollState() {
      const scrollY = window.scrollY;

      if (deepLinkPending && scrollY === 0) {
        return;
      }
      deepLinkPending = false;

      setIsMobileCollapsed((currentState) => {
        if (
          currentState &&
          scrollY < COLLAPSING_HERO_CONFIG.mobileExpandScrollY
        ) {
          return false;
        }

        if (
          !currentState &&
          scrollY > COLLAPSING_HERO_CONFIG.mobileCollapseScrollY
        ) {
          return true;
        }

        return currentState;
      });

      if (handoffFrame !== undefined) {
        return;
      }

      handoffFrame = window.requestAnimationFrame(() => {
        const progress = clampProgress(
          window.scrollY /
            COLLAPSING_HERO_CONFIG.desktopHandoffDistance,
        );
        if (rootRef.current) {
          applyDesktopHandoff(rootRef.current, progress);
        }
        setIsRailInteractive(
          progress >= COLLAPSING_HERO_CONFIG.desktopInteractionHandoff,
        );
        handoffFrame = undefined;
      });
    }

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      window.clearTimeout(releaseDeepLinkTimer);
      window.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
      if (handoffFrame !== undefined) {
        window.cancelAnimationFrame(handoffFrame);
      }
    };
  }, []);

  // Keep the top rail on the same row as the name. Centering the taller rack on
  // the resume block pulls it above the heading and off the viewport.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let frame: number | undefined;
    let attempts = 0;

    const alignRack = () => {
      frame = undefined;

      const scale = root.querySelector<HTMLElement>(".shirt-rail-scale");
      if (!scale) {
        return;
      }

      if (!window.matchMedia("(min-width: 900px)").matches) {
        scale.style.removeProperty("--rack-align-y");
        return;
      }

      const name = root.querySelector(".collapsing-hero-name-heading");
      const rackTopEl =
        root.querySelector(".shirt-rail .kit") ||
        root.querySelector(".shirt-rail .rack-room");

      if (!name || !rackTopEl) {
        if (attempts < 40) {
          attempts += 1;
          frame = window.requestAnimationFrame(alignRack);
        }
        return;
      }

      const drift =
        rackTopEl.getBoundingClientRect().top -
        name.getBoundingClientRect().top;

      if (Math.abs(drift) < 0.5) {
        return;
      }

      const applied =
        parseFloat(
          window
            .getComputedStyle(scale)
            .getPropertyValue("--rack-align-y"),
        ) || 0;

      scale.style.setProperty("--rack-align-y", `${applied - drift}px`);
    };

    const scheduleAlign = () => {
      if (frame !== undefined) {
        return;
      }
      frame = window.requestAnimationFrame(alignRack);
    };

    scheduleAlign();
    alignRack();
    document.fonts?.ready.then(scheduleAlign).catch(() => {});
    window.addEventListener("resize", scheduleAlign);
    document.addEventListener("shirt-rail-ready", scheduleAlign);

    const observer = new ResizeObserver(scheduleAlign);
    observer.observe(root);
    const copy = root.querySelector(".collapsing-hero-copy-layer");
    const wrap = root.querySelector(".shirt-rail-wrap");
    if (copy) {
      observer.observe(copy);
    }
    if (wrap) {
      observer.observe(wrap);
    }

    return () => {
      window.removeEventListener("resize", scheduleAlign);
      document.removeEventListener("shirt-rail-ready", scheduleAlign);
      observer.disconnect();
      if (frame !== undefined) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    let secondFrame: number | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setIsMotionReady(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleMotionPreference);
    return () =>
      mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    const visibleProjects = new Set<string>();
    const projectElements = HOME_PROJECTS.map((project) =>
      document.getElementById(project.id),
    ).filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleProjects.add(entry.target.id);
          } else {
            visibleProjects.delete(entry.target.id);
          }
        });

        const closestProject = [...visibleProjects]
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => element !== null)
          .sort((first, second) => {
            const focusLine = window.innerHeight * 0.08;
            return (
              Math.abs(first.getBoundingClientRect().top - focusLine) -
              Math.abs(second.getBoundingClientRect().top - focusLine)
            );
          })[0];

        if (closestProject) {
          setActiveProjectId(closestProject.id);
        }
      },
      {
        rootMargin: "-5% 0px -78% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      },
    );

    projectElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileCollapsed) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileCollapsed]);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 900px)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", closeMenuOnDesktop);
    return () =>
      desktopMediaQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) {
        return;
      }

      const focusableElements = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]):not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleMenuKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) {
        return;
      }

      if (HOME_PROJECTS.some((project) => project.id === sectionId)) {
        setActiveProjectId(sectionId);
      }
      setIsMobileMenuOpen(false);
      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [prefersReducedMotion],
  );

  const handleSectionClick = useCallback(
    (
      event: ReactMouseEvent<HTMLAnchorElement>,
      sectionId: string,
    ) => {
      event.preventDefault();
      scrollToSection(sectionId);
    },
    [scrollToSection],
  );

  const handleScrollToTop = useCallback(() => {
    setIsMobileMenuOpen(false);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const rootStyle: CollapsingHeroStyle = {
    "--desktop-hero-x": `${initialHandoffValues.heroX}px`,
    "--desktop-hero-blur": `${initialHandoffValues.heroBlur}px`,
    "--desktop-hero-opacity": initialHandoffValues.heroOpacity,
    "--desktop-rail-x": `${initialHandoffValues.railX}px`,
    "--desktop-rail-opacity": initialHandoffValues.railOpacity,
    "--mobile-bar-transition-ms": `${COLLAPSING_HERO_CONFIG.mobileBarTransitionMs}ms`,
    "--hero-fade-ms": `${COLLAPSING_HERO_CONFIG.heroFadeMs}ms`,
  };
  const expandedTabIndex = isRailInteractive ? -1 : 0;
  const collapsedTabIndex = isRailInteractive ? 0 : -1;
  const mobileMenuTabIndex = isMobileMenuOpen ? 0 : -1;

  return (
    <div
      ref={rootRef}
      className={cn(
        "collapsing-home",
        isMobileCollapsed && "is-collapsed",
        isRailInteractive
          ? "is-rail-interactive"
          : "is-hero-interactive",
        isMotionReady && "is-motion-ready",
      )}
      style={rootStyle}
    >
      <header
        className="collapsing-hero-copy-layer"
        aria-hidden={isRailInteractive}
      >
        <h1 className="collapsing-hero-name-heading">
          <button
            type="button"
            className="collapsing-hero-name-button"
            onClick={handleScrollToTop}
            tabIndex={expandedTabIndex}
            aria-label="Amin Hassan — back to top"
          >
            <span className="collapsing-hero-name-text" aria-hidden="true">
              <span>Amin</span>
              <span>Hassan</span>
            </span>
          </button>
        </h1>

        <div className="collapsing-hero-expanded-copy">
          <p className="collapsing-hero-intro">
            currently studying{" "}
            <span className="collapsing-hero-intro-underline">
              CS @ <strong>UWaterloo</strong>
            </span>{" "}
            &amp;{" "}
            <span className="collapsing-hero-intro-underline">
              BBA @ <strong>Wilfrid Laurier</strong>
            </span>{", also "}
            <span className="collapsing-hero-intro-underline">
              designing @ <strong>AMD</strong>
            </span>
          </p>
          <ExperienceAccordion
            idPrefix="desktop-experience"
            tabIndex={expandedTabIndex}
          />
          <KitCollectionHint />
        </div>

        <a
          className="collapsing-hero-scroll-hint"
          href="#projects"
          tabIndex={expandedTabIndex}
          onClick={(event) => handleSectionClick(event, "projects")}
        >
          <span>Scroll for case studies</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </header>

      <nav
        className="collapsing-hero-panel"
        aria-label="Portfolio navigation"
        aria-hidden={!isRailInteractive}
      >
        <button
          type="button"
          className="collapsing-rail-name-button"
          onClick={handleScrollToTop}
          tabIndex={collapsedTabIndex}
          aria-label="Amin Hassan — back to top"
        >
          <span>Amin</span>
          <span>Hassan</span>
        </button>

        <div
          className="collapsing-hero-nav-layer"
        >
          <p className="collapsing-hero-collapsed-program">
            CS @ <strong>UWaterloo</strong>
            <br />
            BBA @ <strong>Wilfrid Laurier</strong>
          </p>

          <div className="collapsing-hero-divider" />
          <p className="collapsing-hero-nav-label">Work</p>

          <ol className="collapsing-hero-work-list">
            {HOME_PROJECTS.map((project, index) => {
              const isActive = activeProjectId === project.id;

              return (
                <li key={project.id}>
                  <a
                    href={`#${project.id}`}
                    tabIndex={collapsedTabIndex}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) =>
                      handleSectionClick(event, project.id)
                    }
                  >
                    <span className="collapsing-hero-work-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{project.navTitle}</span>
                    <span
                      className="collapsing-hero-active-dot"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ol>

          <div className="collapsing-hero-divider" />

          <div className="collapsing-hero-secondary-links">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={collapsedTabIndex}
            >
              Resume
            </a>
          </div>

          <a
            className="collapsing-hero-email"
            href={`mailto:${EMAIL_ADDRESS}`}
            tabIndex={collapsedTabIndex}
          >
            {EMAIL_ADDRESS}
          </a>
        </div>
      </nav>

      <section
        id="collection"
        className="collapsing-hero-stage"
        aria-labelledby="collection-title"
      >
        <div className="collapsing-mobile-intro">
          <h1>
            <span>Amin</span>
            <span>Hassan</span>
          </h1>
          <p className="collapsing-hero-intro">
            currently studying{" "}
            <span className="collapsing-hero-intro-underline">
              CS @ <strong>UWaterloo</strong>
            </span>{" "}
            &amp;{" "}
            <span className="collapsing-hero-intro-underline">
              BBA @ <strong>Wilfrid Laurier</strong>
            </span>{", also "}
            <span className="collapsing-hero-intro-underline">
              designing @ <strong>AMD</strong>
            </span>
          </p>
          <ExperienceAccordion idPrefix="mobile-experience" />
          <KitCollectionHint />
        </div>

        <h2 id="collection-title" className="shirt-rail-title">
          Jersey collection
        </h2>
        <div className="shirt-rail-wrap">
          <div className="shirt-rail-scale">
            <ShirtRailHero />
          </div>
        </div>
        <a
          className="collapsing-mobile-scroll-hint"
          href="#projects"
          onClick={(event) => handleSectionClick(event, "projects")}
        >
          <span>Scroll for case studies</span>
          <ArrowDown aria-hidden="true" />
        </a>
      </section>

      <div className="collapsing-home-content">{children}</div>

      <header
        className="collapsing-mobile-bar"
        aria-hidden={!isMobileCollapsed}
      >
        <button
          type="button"
          className="collapsing-mobile-name"
          onClick={handleScrollToTop}
          tabIndex={isMobileCollapsed ? 0 : -1}
        >
          Amin Hassan
        </button>
        <button
          ref={mobileMenuButtonRef}
          type="button"
          className="collapsing-mobile-menu-button"
          aria-label={
            isMobileMenuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="collapsing-mobile-menu"
          tabIndex={isMobileCollapsed ? 0 : -1}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          {isMobileMenuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </button>
      </header>

      <div
        ref={mobileMenuRef}
        id="collapsing-mobile-menu"
        className={cn(
          "collapsing-mobile-menu",
          isMobileMenuOpen && "is-open",
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav aria-label="Mobile portfolio navigation">
          <p>Work</p>
          <ol>
            {HOME_PROJECTS.map((project, index) => {
              const isActive = activeProjectId === project.id;

              return (
                <li key={project.id}>
                  <a
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={`#${project.id}`}
                    tabIndex={mobileMenuTabIndex}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) =>
                      handleSectionClick(event, project.id)
                    }
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.navTitle}</strong>
                    <i aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ol>

          <div className="collapsing-mobile-menu-secondary">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuTabIndex}
            >
              Resume
            </a>
          </div>

          <a
            className="collapsing-mobile-menu-email"
            href={`mailto:${EMAIL_ADDRESS}`}
            tabIndex={mobileMenuTabIndex}
          >
            {EMAIL_ADDRESS}
          </a>
        </nav>
      </div>
    </div>
  );
};
