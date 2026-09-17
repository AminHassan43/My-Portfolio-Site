import React, { useEffect, useRef } from 'react';
import { Project } from '../types/project';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (hasNext && onNext) {
            onNext();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  // Prevent body scroll when modal is open and scroll to top
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Scroll to top when modal opens
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Scroll to top when project changes
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black/90 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      {/* Modal Content */}
      <div 
        className={`relative w-full h-full bg-white overflow-y-auto transition-transform duration-300 ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header - Behance style */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-black [font-family:'Bricolage_Grotesque',Helvetica]">
                {project.title}
              </h1>
              <p className="text-gray-600 text-sm [font-family:'Bricolage_Grotesque',Helvetica]">
                {project.subtitle}
              </p>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors ml-4"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main content area with stacked slides - Behance style */}
        <div 
          ref={containerRef}
          className="w-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Project description - minimal */}
          {project.description && (
            <div className="bg-white px-6 py-4 border-b border-gray-100">
              <p className="text-gray-700 text-sm leading-relaxed [font-family:'Bricolage_Grotesque',Helvetica] max-w-4xl mx-auto">
                {project.description}
              </p>
            </div>
          )}

          {/* Stacked slides - NO spacing between them, like Behance */}
          <div className="w-full">
            {project.slides.map((slide, index) => (
              <div
                key={`${project.id}-${index}`}
                className="relative w-full animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={slide}
                  alt={`${project.title} - Slide ${index + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
