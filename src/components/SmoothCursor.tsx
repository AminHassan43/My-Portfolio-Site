import { useEffect, useRef, useState } from "react";

interface SmoothCursorProps {
  children: React.ReactNode;
}

export const SmoothCursor: React.FC<SmoothCursorProps> = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringConstruction, setIsHoveringConstruction] = useState(false);
  const [isHoveringCustomCursor, setIsHoveringCustomCursor] = useState(false);
  const [isShirtDialogOpen, setIsShirtDialogOpen] = useState(false);
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

    const handleShirtRailDialogChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setIsShirtDialogOpen(Boolean(customEvent.detail?.open));
    };

    // Hide the global cursor where a component supplies its own pointer badge.
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const constructionTarget = target.closest('[data-cursor="under-construction"]');
      const customCursorTarget = target.closest('[data-element="about-image"]');
      
      setIsHoveringConstruction(!!constructionTarget);
      setIsHoveringCustomCursor(!!customCursorTarget);
    };

    const handleMouseLeaveCard = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const constructionTarget = target.closest('[data-cursor="under-construction"]');
      const customCursorTarget = target.closest('[data-element="about-image"]');
      
      if (!constructionTarget) {
        setIsHoveringConstruction(false);
      }
      if (!customCursorTarget) {
        setIsHoveringCustomCursor(false);
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
    document.addEventListener('shirt-rail-dialog-change', handleShirtRailDialogChange);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveCard);
      document.removeEventListener('shirt-rail-dialog-change', handleShirtRailDialogChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  const shouldHideCursor = isHoveringCustomCursor || isShirtDialogOpen;

  if (shouldHideCursor) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {/* Global cursor: crosshair or construction badge */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] ${isHoveringConstruction ? "" : "mix-blend-difference"}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 200ms ease-out',
        }}
      >
        {isHoveringConstruction ? (
          <div className="bg-red-500 text-white px-3 py-1 text-sm font-normal rounded-full whitespace-nowrap [font-family:'Space_Mono',monospace]" style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
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
