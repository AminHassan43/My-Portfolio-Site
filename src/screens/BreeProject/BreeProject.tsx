import { NavBarSubsection } from "../Desktop/sections/NavBarSubsection/NavBarSubsection";

import breeSlide1 from "../../assets/bree-slide-1.jpg";
import breeSlide2 from "../../assets/bree-slide-2.jpg";

export const BreeProject = (): JSX.Element => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Navbar at top level - let it handle its own positioning */}
      <NavBarSubsection />
      
      <div className="bg-white w-full min-h-screen">
        <div className="relative min-h-screen">
          {/* Project Slides Container - full width, no gaps, starts at very top */}
          <div className="w-full">
            {/* Slide 1 */}
            <img 
              src={breeSlide1}
              alt="Bree Project Slide 1" 
              className="w-full h-auto block"
            />

             {/* Slide 2 */}
             <img 
               src={breeSlide2}
               alt="Bree Project Slide 2" 
               className="w-full h-auto block"
             />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-50"
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

