import React, { useEffect, useRef, useMemo, useState } from "react";
import { NavBarSubsection } from "../Desktop/sections/NavBarSubsection/NavBarSubsection";
import { Skeleton } from "../../components/ui/skeleton";

import compressedPhotography1 from "../../assets/compressed-photography-1.jpg";
import compressedPhotography2 from "../../assets/compressed-photography-2.jpg";
import compressedPhotography3 from "../../assets/compressed-photography-3.jpg";
import compressedL2M08702 from "../../assets/compressed-L2M08702.jpg";
import compressedDsc02694 from "../../assets/compressed-DSC02694.jpg";
import compressedDsc02362 from "../../assets/compressed-DSC02362.jpg";
import compressedDsc00923 from "../../assets/compressed-DSC00923 (1).jpg";
import compressedDsc08639 from "../../assets/compressed-DSC08639.jpg";
import compressedDsc08380 from "../../assets/compressed-DSC08380.jpg";
import compressedDsc07449 from "../../assets/compressed-DSC07449.jpg";
import compressedDsc07292 from "../../assets/compressed-DSC07292.jpg";
import compressedDsc07233 from "../../assets/compressed-DSC07233.jpg";
import compressedDsc07489 from "../../assets/compressed-DSC07489.jpg";
import compressedDsc07820 from "../../assets/compressed-DSC07820.jpg";
import compressedDsc07942 from "../../assets/compressed-DSC07942.jpg";
import compressedDsc08062 from "../../assets/compressed-DSC08062.jpg";
import compressedDsc08161 from "../../assets/compressed-DSC08161.jpg";
import compressedDsc03264 from "../../assets/compressed-DSC03264.jpg";
import compressedDsc03063 from "../../assets/compressed-DSC03063.jpg";
import compressedDsc00194 from "../../assets/compressed-DSC00194.jpg";
import compressedDsc07884 from "../../assets/compressed-DSC07884 (1).jpg";
import compressedDsc06990 from "../../assets/compressed-DSC06990 (1).jpg";
import compressedDsc05308 from "../../assets/compressed-DSC05308.jpg";

// Placeholder images - in a real app these would be imported or fetched
const PHOTOS = [
  { src: compressedPhotography1 },
  { src: compressedPhotography2 },
  { src: compressedPhotography3 },
  { src: compressedL2M08702 },
  { src: compressedDsc02694 },
  { src: compressedDsc02362 },
  { src: compressedDsc00923 },
  { src: compressedDsc08639 },
  { src: compressedDsc08380 },
  { src: compressedDsc07449 },
  { src: compressedDsc07292 },
  { src: compressedDsc07233 },
  { src: compressedDsc07489 },
  { src: compressedDsc07820 },
  { src: compressedDsc07942 },
  { src: compressedDsc08062 },
  { src: compressedDsc08161 },
  { src: compressedDsc03264 },
  { src: compressedDsc03063 },
  { src: compressedDsc00194 },
  { src: compressedDsc07884 },
  { src: compressedDsc06990 },
  { src: compressedDsc05308 },
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

const GlowCard = ({ src, onLoad }: { src: string, onLoad?: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
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
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group mb-6 break-inside-avoid w-full"
      style={
        {
          "--mouse-x": "-1000px",
          "--mouse-y": "-1000px",
        } as React.CSSProperties
      }
    >
      {/* Skeleton Loading State - Individual fallback */}
      {!loaded && (
        <Skeleton className="w-full h-64 rounded-lg mb-4" />
      )}

      {/* Content Wrapper - Hidden until loaded */}
      <div className={`${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'} transition-opacity duration-500 ease-in-out`}>
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out"></div>
        </div>
      </div>
    </div>
  );
};

export const Photography = (): JSX.Element => {
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
            Moments I've Captured
          </h1>
          <p className="font-normal text-xl md:text-2xl text-gray-400 max-w-2xl leading-tight">
            Shot on Sony A7III with a Tamron 70-200
          </p>
        </div>

        {/* Masonry Grid Content */}
        <div className="relative w-full min-h-[500px]">
           <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {shuffledPhotos.map((photo, index) => (
                <GlowCard 
                  key={index} 
                  src={photo.src} 
                />
              ))}
           </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full py-20 flex flex-col items-center justify-center gap-8 border-t border-white/10 mt-auto">
        <div className="font-normal text-xl md:text-2xl text-white tracking-tight">
            still shooting more :)
        </div>
      </footer>

    </div>
  );
};
