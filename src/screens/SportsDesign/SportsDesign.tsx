import React, { useEffect, useRef, useMemo, useState } from "react";
import { NavBarSubsection } from "../Desktop/sections/NavBarSubsection/NavBarSubsection";
import { Skeleton } from "../../components/ui/skeleton";

import yallaNatlamma from "../../assets/compressed-Yalla Natlamma.jpg";
import wluRugby from "../../assets/compressed-WLU Women's Rugby Home Opener 2024.jpg";
import wluBaseball from "../../assets/compressed-WLU Men's Baseball Home Opener 2024 4x5.jpg";
import niagaraPrep from "../../assets/compressed-Niagara Prep Thank You Graphic 6.jpg";
import canadaSoccer from "../../assets/compressed-Canada Soccer.jpg";
import uclGraphic from "../../assets/compressed-UCL Graphic.jpg";
import dallasMavs from "../../assets/compressed-Dallas Mavs Final.jpg";
import shaiConverse from "../../assets/compressed-Shai Converse Graphic.jpg";
import grade12 from "../../assets/compressed-Grade 12.jpg";
import nphShowcase from "../../assets/compressed-NPH Showcase League SS 2024 Playoff Schedule Cover Grade 9.jpg";
import wluHockey from "../../assets/compressed-WLU Hockey First Year Night 4x5.psd.jpg";
import susaIftar from "../../assets/compressed-SUSA Iftar.jpg";
import wluKatie from "../../assets/compressed-WLU Katie Cosgriffe World Record Fix 2.jpg";
import wluBaseballShowcase from "../../assets/compressed-WLU Baseball Showcase.jpg";

// Placeholder images - in a real app these would be imported or fetched
const PHOTOS = [
  { src: yallaNatlamma, badge: "SUSA Waterloo", badgeColor: "#F5F5DC", textColor: "black" },
  { src: wluRugby, badge: "Laurier Golden Hawks", badgeColor: "#330072", textColor: "white" },
  { src: wluBaseball, badge: "Laurier Golden Hawks", badgeColor: "#330072", textColor: "white" },
  { src: niagaraPrep, badge: "Niagara Prep Academy", badgeColor: "#000080", textColor: "white" },
  { src: canadaSoccer, badge: "DimeDetail", badgeColor: "#0091A2", textColor: "white" },
  { src: uclGraphic, badge: "DimeDetail", badgeColor: "#0091A2", textColor: "white" },
  { src: dallasMavs, badge: "DimeDetail", badgeColor: "#0091A2", textColor: "white" },
  { src: shaiConverse, badge: "DimeDetail", badgeColor: "#0091A2", textColor: "white" },
  { src: grade12, badge: "NorthPoleHoops", badgeColor: "#FF0000", textColor: "white" },
  { src: nphShowcase, badge: "NorthPoleHoops", badgeColor: "#FF0000", textColor: "white" },
  { src: wluHockey, badge: "Laurier Golden Hawks", badgeColor: "#330072", textColor: "white" },
  { src: susaIftar, badge: "SUSA Waterloo", badgeColor: "#F5F5DC", textColor: "black" },
  { src: wluKatie, badge: "Laurier Golden Hawks", badgeColor: "#330072", textColor: "white" },
  { src: wluBaseballShowcase, badge: "Laurier Golden Hawks", badgeColor: "#330072", textColor: "white" },
];

const HalftoneHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{
        "--mouse-x": "-1000px",
        "--mouse-y": "-1000px",
        mask: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
        WebkitMask: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black, transparent)',
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};

const GlowCard = ({ 
  src, 
  badgeText, 
  badgeColor = "#330072", 
  textColor = "white",
  onLoad
}: { 
  src: string; 
  badgeText?: string;
  badgeColor?: string;
  textColor?: string;
  onLoad?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // Handle badge position if it exists
      if (cursorRef.current) {
        // Check if mouse is inside the container
        if (
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom
        ) {
          // Update position relative to viewport since it's fixed
          cursorRef.current.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`;
          cursorRef.current.style.opacity = "1";
        } else {
          cursorRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`relative group mb-6 break-inside-avoid w-full ${badgeText ? 'cursor-none' : ''}`}
        data-element={badgeText ? "about-image" : undefined}
        style={
          {
            "--mouse-x": "-1000px",
            "--mouse-y": "-1000px",
            cursor: badgeText ? 'none' : 'auto',
          } as React.CSSProperties
        }
      >
        {/* Skeleton Loading State - Individual fallback */}
        {!loaded && (
          <Skeleton className="w-full h-64 rounded-lg mb-4" />
        )}

        {/* Content Wrapper - Hidden until loaded */}
        <div className={`${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'} transition-opacity duration-500 ease-in-out`}>
          {/* Tilt Wrapper - Moves everything inside to ensure unified animation */}
          <div className="relative overflow-hidden transition-all duration-300 ease-in-out group-hover:[transform:perspective(1000px)_rotateY(8deg)_scale(1.02)]">
            {/* Glow Border Effect */}
            <div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                padding: "2px", // stroke width
                background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 1), transparent 40%)`,
                mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
              }}
            />
            
            <img
              src={src}
              alt="Portfolio shot"
              className="w-full h-auto block relative z-10"
              onLoad={() => {
                setLoaded(true);
                onLoad?.();
              }}
            />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out pointer-events-none z-30"></div>
          </div>
        </div>
      </div>

      {/* Floating Cursor Badge */}
      {badgeText && (
        <div 
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-200 opacity-0 will-change-transform"
        >
          <div 
            className="px-4 py-2 rounded-full text-sm font-normal shadow-lg whitespace-nowrap [font-family:'Space_Mono',monospace]"
            style={{ backgroundColor: badgeColor, color: textColor }}
          >
            {badgeText}
          </div>
        </div>
      )}
    </>
  );
};

export const SportsDesign = (): JSX.Element => {
  const shuffledPhotos = useMemo(() => {
    return [...PHOTOS].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="bg-[#121212] w-full min-h-screen flex flex-col items-center relative [font-family:'Space_Mono',monospace]">
      <HalftoneHero />
      
      <NavBarSubsection darkMode={true} variant="gallery" />

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-48 pb-20 flex flex-col gap-20">
        
        {/* Hero Section */}
        <div className="flex flex-col gap-4 items-center text-center animate-fade-up relative">
          <h1 className="font-bold text-5xl md:text-8xl tracking-tighter leading-[0.9] text-white">
            My Graphic Design Work
          </h1>
          <p className="font-normal text-xl md:text-2xl text-gray-400 max-w-2xl leading-tight">
            Made with Adobe Photoshop and Figma
          </p>
        </div>

        {/* Masonry Grid Content */}
        <div className="relative w-full min-h-[500px]">
          
          {/* Actual Content */}
          <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {shuffledPhotos.map((photo, index) => (
              <GlowCard 
                key={index} 
                src={photo.src} 
                badgeText={photo.badge} 
                badgeColor={photo.badgeColor}
                textColor={photo.textColor}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full py-20 flex flex-col items-center justify-center gap-8 border-t border-white/10 mt-auto">
        <div className="font-normal text-xl md:text-2xl text-white tracking-tight">
            always creating art
        </div>
      </footer>

    </div>
  );
};
