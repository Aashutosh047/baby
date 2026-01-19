import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

const TypewriterText = ({
  text,
  speed = 50,
  onComplete,
  className = "",
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-0.5 h-5 ml-1 bg-primary animate-pulse" />
      )}
    </span>
  );
};

export default TypewriterText;