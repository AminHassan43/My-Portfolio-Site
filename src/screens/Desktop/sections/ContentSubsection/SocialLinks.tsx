import { cn } from "../../../../lib/utils";

interface SocialLinkProps {
  href: string;
  iconPath: string;
  viewBox?: string;
  className?: string;
}

export const SocialLink = ({ href, iconPath, viewBox = "0 0 24 24", className }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn("social-icon w-10 h-10 hover:scale-110 transition-transform duration-200", className)}
  >
    <svg
      className="w-full h-full text-black hover:text-gray-600"
      fill="currentColor"
      viewBox={viewBox}
    >
      <path d={iconPath} />
    </svg>
  </a>
);

