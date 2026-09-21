import { cn } from "../../../../lib/utils";
import { useEffect, useRef, useState } from "react";

interface ImageConfig {
  src: string;
  badge?: {
    text: string;
    color: string;
  };
}

interface AboutImageProps {
  images?: (string | ImageConfig)[];
  src?: string;
  alt: string;
}

export const AboutImage = ({ images = [], src, alt }: AboutImageProps) => {
  // Normalize images to ImageConfig format
  const normalizeImage = (img: string | ImageConfig): ImageConfig => {
    if (typeof img === 'string') {
      return { src: img };
    }
    return img;
  };

  // Combine sources, ensuring at least one image
  const rawImages = images.length > 0 ? images : (src ? [src] : ["/placeholder.svg"]);
  const allImages = rawImages.map(normalizeImage);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && cursorRef.current && tiltRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        
        const isInside = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        // Handle Cursor Badge
        if (isInside) {
          cursorRef.current.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`;
          cursorRef.current.style.opacity = "1";
        } else {
          cursorRef.current.style.opacity = "0";
        }

        // Handle Image Tilt & Move
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Calculate movement (move slightly towards mouse)
        const moveX = deltaX * 0.05;
        const moveY = deltaY * 0.05;
        
        // Calculate rotation (tilt towards mouse)
        const rotateY = deltaX * 0.02;
        const rotateX = -deltaY * 0.02;

        const scale = isInside ? 1.02 : 1;

        // Apply to tilt container only
        tiltRef.current.style.transform = `
          perspective(1000px) 
          translate3d(${moveX}px, ${moveY}px, 0) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(${scale})
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    if (isFlipped || allImages.length <= 1) return;

    setIsFlipped(true);

    // Wait for transition to finish (700ms matching duration-700)
    setTimeout(() => {
      setIsResetting(true);
      setIsFlipped(false);
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
      
      // Re-enable transitions after a brief frame
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsResetting(false);
        }, 50);
      });
    }, 700);
  };

  const currentImg = allImages[currentIndex];
  const nextImg = allImages[(currentIndex + 1) % allImages.length];

  return (
    <div 
      ref={containerRef} 
      className="relative group cursor-none block w-full max-w-[400px] aspect-[400/435] mx-auto md:mx-0" 
      data-element="about-image" 
      onClick={handleClick}
    >
      {/* Tilt Container */}
      <div 
        ref={tiltRef}
        className="w-full h-full will-change-transform [transform-style:preserve-3d]"
      >
        {/* Flip Container */}
        <div 
          className={cn(
            "w-full h-full relative [transform-style:preserve-3d]",
            isResetting ? "transition-none" : "transition-transform duration-700 ease-in-out"
          )}
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front Face */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[14px] shadow-lg overflow-hidden bg-white">
            <img
              className="w-full h-full object-cover block"
              alt={alt}
              src={currentImg.src}
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out pointer-events-none"></div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[14px] shadow-lg overflow-hidden bg-gray-100">
             <img
               className="w-full h-full object-cover block"
               alt={alt}
               src={nextImg.src}
             />
          </div>
        </div>
      </div>

      {/* Floating Cursor Badge */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-200 opacity-0 will-change-transform"
      >
        <div 
          className="text-white px-4 py-2 rounded-full text-[12px] font-medium shadow-lg whitespace-nowrap [font-family:'Bricolage_Grotesque',Helvetica] transition-colors duration-300"
          style={{ backgroundColor: currentImg.badge?.color || "#0e46a0" }}
        >
          {currentImg.badge?.text || "PSG 2024/25 Fourth Kit"}
        </div>
      </div>
    </div>
  );
};
