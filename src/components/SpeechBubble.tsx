import { ReactNode } from "react";

interface SpeechBubbleProps {
  children: ReactNode;
  position?: "top" | "bottom";
  animate?: boolean;
  className?: string;
}

const SpeechBubble = ({
  children,
  position = "top",
  animate = true,
  className = "",
}: SpeechBubbleProps) => {
  return (
    <div
      className={`relative glass-card rounded-2xl p-4 md:p-6 max-w-sm md:max-w-md mx-auto ${
        animate ? "animate-fade-in-scale" : ""
      } ${className}`}
    >
      {children}
      
      {/* Tail */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 ${
          position === "top"
            ? "bottom-0 translate-y-full border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-card"
            : "top-0 -translate-y-full border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent border-b-card"
        }`}
      />
    </div>
  );
};

export default SpeechBubble;