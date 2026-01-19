import { useState, useCallback } from "react";
import pigNormal from "@/assets/pig-normal.png";
import pigParty from "@/assets/pig-party.png";
import pigExcited from "@/assets/pig-excited.png";
import useSounds from "@/hooks/useSounds";

interface PigCharacterProps {
  variant?: "normal" | "party" | "excited";
  size?: "small" | "medium" | "large";
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  small: "w-24 h-24 md:w-32 md:h-32",
  medium: "w-40 h-40 md:w-52 md:h-52",
  large: "w-56 h-56 md:w-72 md:h-72",
};

const pigImages = {
  normal: pigNormal,
  party: pigParty,
  excited: pigExcited,
};

const PigCharacter = ({
  variant = "normal",
  size = "medium",
  animate = true,
  onClick,
  className = "",
}: PigCharacterProps) => {
  const [isOinking, setIsOinking] = useState(false);
  const { playOink } = useSounds();

  const handleClick = useCallback(() => {
    setIsOinking(true);
    playOink();
    onClick?.();
    setTimeout(() => setIsOinking(false), 500);
  }, [onClick, playOink]);

  return (
    <div
      className={`relative cursor-pointer transition-transform hover:scale-105 ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
    >
      <img
        src={pigImages[variant]}
        alt="Cute pig character"
        className={`w-full h-full object-contain pig-shadow ${
          animate ? "animate-bounce-gentle" : ""
        } ${isOinking ? "animate-wiggle-fast" : ""}`}
      />
      
      {/* Oink bubble */}
      {isOinking && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-pop-in">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-lg font-bold whitespace-nowrap">
            Oink! 🐽
          </div>
        </div>
      )}
    </div>
  );
};

export default PigCharacter;
