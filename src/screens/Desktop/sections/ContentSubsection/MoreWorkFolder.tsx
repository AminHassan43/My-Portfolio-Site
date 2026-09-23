import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import rectangle8 from "../../../../assets/rectangle-8.svg";
import union from "../../../../assets/union.svg";

interface WorkCategory {
  name: string;
  images: string[];
  url?: string;
}

interface MoreWorkFolderProps {
  category: WorkCategory;
}

// Animation Overlay Component
const ExplosionOverlay = ({ 
  images, 
  originRect, 
  onComplete 
}: { 
  images: string[], 
  originRect: DOMRect, 
  onComplete: () => void 
}) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation shortly after mount
    requestAnimationFrame(() => {
      setAnimate(true);
    });
    
    // Navigate after animation
    // The entire image explosion should be 800ms
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const scale = Math.max(0.1, originRect.width / 249);

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      {/* Dynamic style for keyframes */}
      <style>{`
        @keyframes shootUpAndCenter0 {
          0% { transform: translate(0, 0) scale(1) rotate(-8deg); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); filter: blur(0px); }
          30% { transform: translate(0, -150px) scale(3) rotate(-12deg); animation-timing-function: ease-out; }
          50% { filter: blur(0px); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); }
          100% { transform: translate(calc(50vw - var(--img-center-x) - 25vw), calc(50vh - var(--img-center-y) - 10vh)) scale(15) rotate(-25deg); filter: blur(20px); }
        }
        @keyframes shootUpAndCenter1 {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); filter: blur(0px); }
          30% { transform: translate(0, -150px) scale(3) rotate(0deg); animation-timing-function: ease-out; }
          50% { filter: blur(0px); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); }
          100% { transform: translate(calc(50vw - var(--img-center-x)), calc(50vh - var(--img-center-y))) scale(15) rotate(0deg); filter: blur(20px); }
        }
        @keyframes shootUpAndCenter2 {
          0% { transform: translate(0, 0) scale(1) rotate(8deg); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); filter: blur(0px); }
          30% { transform: translate(0, -150px) scale(3) rotate(12deg); animation-timing-function: ease-out; }
          50% { filter: blur(0px); animation-timing-function: cubic-bezier(0.9, 0, 1, 1); }
          100% { transform: translate(calc(50vw - var(--img-center-x) + 25vw), calc(50vh - var(--img-center-y) + 10vh)) scale(15) rotate(25deg); filter: blur(20px); }
        }
      `}</style>

      {/* Background fill (behind images) */}
      <div 
        className={`absolute inset-0 bg-[#121212] transition-opacity duration-500 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`} 
        style={{ transitionDelay: '200ms' }}
      />

      {/* Replicated Folder Front for layering */}
      <img 
        src={rectangle8}
        className={`absolute z-[60] transition-transform duration-[250ms]`}
        style={{
          top: originRect.top + 39 * scale, // Match original CSS top: 39px
          left: originRect.left,
          width: originRect.width,
          height: 119 * scale,
          transformOrigin: 'bottom',
          // The folder ScaleY compression should be 300ms linear
          transitionTimingFunction: 'linear',
          transform: animate ? 'scaleY(0)' : 'scaleY(1)'
        }}
      />

      {images.map((src, i) => {
        // Initial position relative to the viewport
        const initialTop = originRect.top + (35 + i * 5) * scale;
        const initialLeft = originRect.left + (50 + i * 30) * scale;
        
        const imageCenterX = initialLeft + 40 * scale;
        const imageCenterY = initialTop + 50 * scale;

        const style = {
          top: initialTop,
          left: initialLeft,
          width: 80 * scale,
          height: 100 * scale,
          zIndex: 50, // Behind the folder front (z-60) initially
          '--img-center-x': `${imageCenterX}px`,
          '--img-center-y': `${imageCenterY}px`,
          animation: animate ? `shootUpAndCenter${i % 3} 0.8s forwards` : 'none',
        } as React.CSSProperties;

        return (
          <img
            key={i}
            src={src}
            alt=""
            className="absolute object-cover rounded-lg"
            style={style}
          />
        );
      })}

      {/* Foreground fade to match new page background */}
      <div 
        className={`absolute inset-0 bg-[#121212] z-70 transition-opacity duration-400 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`} 
        style={{ transitionDelay: '400ms', backdropFilter: 'blur(10px)' }}
      />
    </div>,
    document.body
  );
};

export const MoreWorkFolder = ({ category }: MoreWorkFolderProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!category.url) return;
    e.preventDefault(); // Prevent drag etc
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (!category.url || !isPressed) return;
    setIsPressed(false);
    setIsExploding(true);
  };

  const handleMouseLeave = () => {
    if (isPressed) setIsPressed(false);
  };

  const handleComplete = () => {
    if (category.url) {
      navigate(category.url);
    }
  };

  const Content = () => (
    <div 
      data-cursor={!category.url ? "under-construction" : undefined}
      className={`more-work-item inline-flex flex-col items-center gap-4 relative rounded-[14.77px] transition-all duration-200 ease-in-out cursor-pointer group
        ${isPressed ? "scale-95 translate-y-1" : "hover:-translate-y-2"}
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={folderRef}
        className="more-work-art relative w-[249.28px] h-[157.2px] overflow-visible"
      >
        <div className="more-work-art-inner relative w-[249px] h-[157px] overflow-visible">
          <img
            className="more-work-folder-union absolute w-[233px] h-[157px] top-0 left-px"
            alt="Union"
            src={union}
          />
          
          {/* Images */}
          {/* 
              Refined Animation Logic for Smoother Transitions
              - Using explicit conditional classes for 'idle' vs 'pressed' states to ensure clean transitions
              - Increased duration for pressed state to avoid 'snap'
          */}
          
          {/* Image 1 */}
          <div className={`more-work-image more-work-image-1 absolute w-[80px] h-[100px] top-[35px] left-[50px] z-0 transition-all ease-out
            ${isPressed 
              ? 'translate-y-2 translate-x-0 rotate-[-8deg] duration-300' 
              : 'group-hover:-translate-y-16 group-hover:-translate-x-4 group-hover:rotate-[-15deg] -translate-y-4 -translate-x-2 rotate-[-8deg] duration-500 delay-100'
            }
            ${isExploding ? 'opacity-0' : 'opacity-100'}
          `}>
            <img
              className="w-full h-full rounded-lg object-cover"
              alt={`${category.name} 1`}
              src={category.images[0]}
            />
          </div>

          {/* Image 2 */}
          <div className={`more-work-image more-work-image-2 absolute w-[80px] h-[100px] top-[40px] left-[85px] z-0 transition-all ease-out
            ${isPressed 
              ? 'translate-y-2 duration-300' 
              : 'group-hover:-translate-y-20 -translate-y-6 duration-500 delay-200'
            }
            ${isExploding ? 'opacity-0' : 'opacity-100'}
          `}>
            <img
              className="w-full h-full rounded-lg object-cover"
              alt={`${category.name} 2`}
              src={category.images[1]}
            />
          </div>

          {/* Image 3 */}
          <div className={`more-work-image more-work-image-3 absolute w-[80px] h-[100px] top-[35px] left-[110px] z-0 transition-all ease-out
            ${isPressed 
              ? 'translate-y-2 translate-x-0 rotate-[8deg] duration-300' 
              : 'group-hover:-translate-y-16 group-hover:translate-x-4 group-hover:rotate-[15deg] -translate-y-4 translate-x-2 rotate-[8deg] duration-500 delay-300'
            }
            ${isExploding ? 'opacity-0' : 'opacity-100'}
          `}>
            <img
              className="w-full h-full rounded-lg object-cover"
              alt={`${category.name} 3`}
              src={category.images[2]}
            />
          </div>
          
          <img
            className={`more-work-folder-front absolute w-[249px] h-[119px] top-[39px] left-0 z-10 ${isExploding ? 'opacity-0' : 'opacity-100'}`}
            alt="Rectangle"
            src={rectangle8}
          />
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[3.08px] relative">
        <div className="more-work-text relative self-stretch mt-[-0.62px] [font-family:'Space_Mono',monospace] font-normal text-black text-[16px] text-center tracking-[-0.56px] leading-[1.4]">
          {category.name}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* If it has a URL, we use a div to handle the click/animation manually */}
      {category.url ? (
        <div className="flex justify-center w-full select-none">
          <Content />
        </div>
      ) : (
        <Content />
      )}

      {isExploding && category.url && folderRef.current && (
        <ExplosionOverlay 
          images={category.images} 
          originRect={folderRef.current.getBoundingClientRect()} 
          onComplete={handleComplete}
        />
      )}
    </>
  );
};
