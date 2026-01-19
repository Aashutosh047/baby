import { useState, useEffect } from "react";
import cakeImage from "@/assets/birthday-cake.png";
import useSounds from "@/hooks/useSounds";

interface BirthdayCakeProps {
  userName: string;
  onBlowOut: () => void;
}

const BirthdayCake = ({ userName, onBlowOut }: BirthdayCakeProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [blowCount, setBlowCount] = useState(0);
  const { playBlow, playBirthday, playMagical } = useSounds();

  useEffect(() => {
    // Play birthday sound when cake appears
    playBirthday();
    const timer = setTimeout(() => setShowInstructions(true), 2000);
    return () => clearTimeout(timer);
  }, [playBirthday]);

  const blowCandles = () => {
    playBlow();
    const newCount = blowCount + 1;
    setBlowCount(newCount);
    
    if (newCount >= 3) {
      setCandlesLit(false);
      playMagical();
      setTimeout(onBlowOut, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Happy Birthday text */}
      <h1 className="text-3xl md:text-5xl font-bold gradient-text text-shadow-glow animate-pulse-glow text-center">
        🎂 Happy Birthday {userName}! 🎂
      </h1>

      {/* Cake */}
      <div className="relative">
        <img
          src={cakeImage}
          alt="Birthday cake"
          className="w-64 h-64 md:w-80 md:h-80 object-contain animate-bounce-gentle"
        />
        
        {/* Candle flames overlay */}
        {candlesLit && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-6 bg-gradient-to-t from-coral to-sparkle rounded-full animate-flame"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {/* Blown out effect */}
        {!candlesLit && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce-in">💨✨</div>
          </div>
        )}
      </div>

      {/* Instructions */}
      {showInstructions && candlesLit && (
        <div className="flex flex-col items-center gap-4 animate-slide-up">
          <p className="text-xl font-semibold text-foreground text-center">
            Make a wish and blow out the candles!
          </p>
          
          <button
            onClick={blowCandles}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-xl font-bold 
                       shadow-lg hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
          >
            💨 Blow! ({3 - blowCount} more)
          </button>
          
          {blowCount > 0 && blowCount < 3 && (
            <p className="text-muted-foreground animate-wiggle">
              Blow harder! 😤
            </p>
          )}
        </div>
      )}

      {/* Success message */}
      {!candlesLit && (
        <p className="text-2xl font-bold gradient-text animate-bounce-in">
          ✨ Your wish is on its way! ✨
        </p>
      )}
    </div>
  );
};

export default BirthdayCake;
