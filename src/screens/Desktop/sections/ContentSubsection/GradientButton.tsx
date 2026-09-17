import { ButtonHTMLAttributes } from "react";
import { cn } from "../../../../lib/utils";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  containerClassName?: string;
}

export const GradientButton = ({ children, className, containerClassName, ...props }: GradientButtonProps) => {
  return (
    <button
      className={cn(
        "badge-button inline-flex items-center justify-center relative rounded-[9999px] border-none",
        "bg-[linear-gradient(90deg,#E5E5E5_0%,#CCCCCC_100%)]",
        "before:content-[''] before:absolute before:inset-0 before:p-[2px] before:rounded-[9999px]",
        "before:[background:linear-gradient(134deg,rgba(186,186,186,0.81)_0%,rgba(99,99,99,1)_74%,rgba(186,186,186,0.81)_100%)]",
        "before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none",
        "h-auto whitespace-nowrap group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        "hover:bg-[linear-gradient(270deg,#F0F0F0_0%,#D9D9D9_100%)]",
        "hover:before:[background:linear-gradient(226deg,rgba(200,200,200,0.9)_0%,rgba(120,120,120,1)_74%,rgba(200,200,200,0.9)_100%)]",
        "transition-all duration-[2000ms] ease-out overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out"></div>
      {children}
    </button>
  );
};

