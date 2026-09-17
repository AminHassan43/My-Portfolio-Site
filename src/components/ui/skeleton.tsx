import React from "react";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${className}`}
    >
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  );
};




