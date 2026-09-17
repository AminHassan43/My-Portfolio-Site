import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { cn } from "../../../../lib/utils";

const NAV_ITEMS = [
  { label: "home", target: "top" },
  { label: "work", target: "projects" },
  { label: "about", target: "about" },
] as const;

interface NavBarSubsectionProps {
  darkMode?: boolean;
}

export const NavBarSubsection = ({ darkMode = false }: NavBarSubsectionProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (target: string) => {
    const isHome = location.pathname === '/';

    if (!isHome) {
      navigate(target === 'top' ? '/' : `/#${target}`);
      setIsMobileMenuOpen(false);
      return;
    }

    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }

    const section = document.querySelector(`[data-section="${target}"]`);
    if (section) {
      const offset = target === 'projects' ? 100 : 0;
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const textColor = darkMode && !isScrolled && !isMobileMenuOpen 
    ? "text-white" 
    : darkMode && isScrolled 
      ? "text-white" 
      : "text-black";
      
  const logoColor = darkMode && !isScrolled && !isMobileMenuOpen 
    ? "text-white" 
    : darkMode && isScrolled
      ? "text-white"
      : "text-black";

  const navBg = isScrolled || isMobileMenuOpen 
    ? (darkMode ? "backdrop-blur-md bg-[#121212]/80 shadow-sm" : "backdrop-blur-md bg-white/80 shadow-sm")
    : "bg-transparent";

  const mobileMenuBg = darkMode ? "bg-[#121212]/95" : "bg-white/95";
  const mobileMenuText = darkMode ? "text-white" : "text-black";

  return (
    <nav className={cn(
      "nav-container fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ease-in-out",
      navBg
    )}>
      <div className="flex items-center justify-between w-full max-w-[1318px] mx-auto px-8 md:px-8 py-6">
        <div className={cn(
          "nav-logo relative [font-family:'Bricolage_Grotesque',Helvetica] font-extrabold text-2xl md:text-[32px] tracking-[-1.28px] leading-[normal] whitespace-nowrap",
          logoColor
        )}>
          Amin Hassan
        </div>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="nav-links flex items-center gap-[70px]">
              {NAV_ITEMS.map(({ label, target }) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink
                    onClick={() => handleNavigation(target)}
                    className={cn(
                      "nav-link relative [font-family:'Bricolage_Grotesque',Helvetica] font-light text-[32px] tracking-[-1.28px] leading-[normal] whitespace-nowrap hover:opacity-70 transition-all duration-300 cursor-pointer",
                      textColor
                    )}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <button 
          className={cn("md:hidden p-2", textColor)}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={cn(
          "md:hidden backdrop-blur-md border-t px-4 py-6 shadow-lg absolute w-full left-0 h-screen",
          mobileMenuBg,
          darkMode ? "border-white/10" : "border-gray-100"
        )}>
          <div className="flex flex-col gap-8 items-center justify-center h-3/4">
            {NAV_ITEMS.map(({ label, target }) => (
              <button
                key={label}
                onClick={() => handleNavigation(target)}
                className={cn(
                  "[font-family:'Bricolage_Grotesque',Helvetica] font-light text-4xl tracking-[-1.28px] leading-[normal] hover:opacity-70 transition-all duration-300",
                  mobileMenuText
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
