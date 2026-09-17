import { cn } from "../../../../lib/utils";

interface CompanyLogoProps {
  src: string;
  alt: string;
  role: string;
  period: string;
  className?: string;
}

export const CompanyLogo = ({ src, alt, role, period, className }: CompanyLogoProps) => {
  return (
    <div className="relative group">
      <img
        className={cn("company-logo relative object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-60", className)}
        alt={alt}
        src={src}
      />
      {/* Job Title Tag */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 max-w-[90vw] sm:max-w-none">
        <div className="group-hover:animate-bounce relative bg-white rounded-full px-6 py-2 shadow-lg border border-gray-200 whitespace-nowrap">
          <div className="text-sm text-gray-800 [font-family:'Bricolage_Grotesque',Helvetica]">
            <span className="font-bold">{role}</span> | <span className="font-medium">{period}</span>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </div>
    </div>
  );
};
