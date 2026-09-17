import { useEffect, useRef, useState } from "react";

interface SmoothCursorProps {
  children: React.ReactNode;
}

export const SmoothCursor: React.FC<SmoothCursorProps> = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringMasaajid, setIsHoveringMasaajid] = useState(false);
  const [isHoveringAbout, setIsHoveringAbout] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Only hide if mouse leaves the entire document
      if (!e.relatedTarget && e.target === document.documentElement) {
        setIsVisible(false);
      }
    };

    // Handle hover events for special cards
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const masaajidCard = target.closest('[data-project="masaajid"]');
      const constructionTarget = target.closest('[data-cursor="under-construction"]');
      const aboutImage = target.closest('[data-element="about-image"]');
      
      setIsHoveringMasaajid(!!masaajidCard || !!constructionTarget);
      setIsHoveringAbout(!!aboutImage);
    };

    const handleMouseLeaveCard = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const masaajidCard = target.closest('[data-project="masaajid"]');
      const constructionTarget = target.closest('[data-cursor="under-construction"]');
      const aboutImage = target.closest('[data-element="about-image"]');
      
      if (!masaajidCard && !constructionTarget) {
        setIsHoveringMasaajid(false);
      }
      if (!aboutImage) {
        setIsHoveringAbout(false);
      }
    };

    // Smooth cursor animation function
    const animateCursor = () => {
      setCursorPosition(prev => {
        const dx = targetPosition.current.x - prev.x;
        const dy = targetPosition.current.y - prev.y;
        
        // Smooth interpolation factor (0.1 = very smooth, 0.3 = less smooth)
        const factor = 0.3;
        
        return {
          x: prev.x + dx * factor,
          y: prev.y + dy * factor
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveCard);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveCard);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Should hide cursor if hovering About image (since it has its own badge)
  // Should show custom cursor for Masaajid
  // Should show default crosshair otherwise
  const shouldHideCursor = isHoveringAbout;

  if (shouldHideCursor) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {/* Global cursor - crosshair or red badge */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] ${isHoveringMasaajid ? '' : 'mix-blend-difference'}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 200ms ease-out',
        }}
      >
        {isHoveringMasaajid ? (
          /* Red "Under Construction" badge cursor */
          <div className="bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap [font-family:'Bricolage_Grotesque',Helvetica]" style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
            Under Construction
          </div>
        ) : (
          /* Crosshair lines */
          <div className="absolute w-8 h-8">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -translate-y-1/2"></div>
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white transform -translate-x-1/2"></div>
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
    </>
  );
};
