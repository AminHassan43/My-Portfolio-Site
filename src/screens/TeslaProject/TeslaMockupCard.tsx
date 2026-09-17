import { cn } from "../../../lib/utils";

interface TeslaMockupCardProps {
  imageSrc: string;
  alt: string;
  captionTitle: string;
  captionText: string;
  delay?: string;
}

export const TeslaMockupCard = ({ imageSrc, alt, captionTitle, captionText, delay = "0ms" }: TeslaMockupCardProps) => {
  return (
    <div className="flex flex-col gap-6 items-center group">
      <div 
        className="relative w-full max-w-[320px] aspect-[9/19.5] rounded-[30px] p-[3px] overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-4 shadow-2xl"
        style={{ animationDelay: delay }}
      >
        {/* Moving Border Gradient - Visible on Hover */}
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#E31937_50%,#00000000_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Container */}
        <div className="relative h-full w-full bg-black rounded-[27px] overflow-hidden z-10">
          <img 
            src={imageSrc} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
          {/* Static Border Ring (optional, for when not hovering) */}
          <div className="absolute inset-0 rounded-[27px] ring-1 ring-white/10 pointer-events-none" />
        </div>
      </div>

      <div className="text-center">
        <h4 className="font-bold text-xl mb-2">{captionTitle}</h4>
        <p className="text-sm text-gray-500 font-light">{captionText}</p>
      </div>
    </div>
  );
};


