import { useState, useEffect } from "react";
import giftImage from "@/assets/gift-box.png";
import birthdayGuy from "@/assets/birthday-guy.jpg";
import PigCharacter from "./PigCharacter";
import confetti from "canvas-confetti";
import useSounds from "@/hooks/useSounds";

interface GiftRevealProps {
  userName: string;
  onReplay: () => void;
}

const suspenseMessages = [
  "Hmm, what could it be? 🤔",
  "Something special is inside...",
  "Are you ready? 😏",
  "3... 2... 1...",
];

const GiftReveal = ({ userName, onReplay }: GiftRevealProps) => {
  const [stage, setStage] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const { playWhoosh, playTada, playMagical, playClick } = useSounds();

  useEffect(() => {
    if (stage < suspenseMessages.length) {
      const timer = setTimeout(() => {
        setStage((prev) => prev + 1);
        setShakeIntensity((prev) => Math.min(prev + 1, 4));
        playWhoosh();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage, isOpened, playWhoosh]);

  const openGift = () => {
    if (stage >= suspenseMessages.length && !isOpened) {
      setIsOpened(true);
      playTada();
      
      // Mega confetti!
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
      // Play magical sound after a bit
      setTimeout(() => playMagical(), 1500);
    }
  };

  const handleReplay = () => {
    playClick();
    onReplay();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {!isOpened ? (
        <>
          {/* Suspense message */}
          <div className="h-12">
            {stage > 0 && stage <= suspenseMessages.length && (
              <p className="text-xl md:text-2xl font-semibold text-foreground animate-fade-in-scale text-center">
                {suspenseMessages[stage - 1]}
              </p>
            )}
          </div>

          {/* Shaking gift */}
          <div
            className={`cursor-pointer transition-transform ${
              stage >= suspenseMessages.length
                ? "hover:scale-105"
                : ""
            }`}
            style={{
              animation:
                shakeIntensity > 0
                  ? `gift-shake ${0.8 - shakeIntensity * 0.1}s ease-in-out infinite`
                  : "none",
            }}
            onClick={openGift}
          >
            <img
              src={giftImage}
              alt="Gift box"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>

          {/* Tap to open hint */}
          {stage >= suspenseMessages.length && (
            <p className="text-lg font-medium text-primary animate-bounce-gentle">
              👆 Tap to open!
            </p>
          )}
        </>
      ) : (
        <>
          {/* Revealed pig */}
          <div className="animate-bounce-in">
            <PigCharacter variant="party" size="large" animate />
          </div>

          {/* Reveal message */}
          <div className="text-center space-y-4 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              IT'S ME! 🐷
            </h2>
            <p className="text-xl text-foreground">
              Your gift is... <strong>me be grateful</strong>
            </p>
            <p className="text-lg text-muted-foreground">
              (No refunds 😎 no takeback😎 there is no undo button 💖you are stuck with me 💖)
            </p>
          </div>

          {/* Photo section - The Birthday Guy */}
          <div className="animate-fade-in-scale mt-4">
            <div className="glass-card rounded-3xl p-4 shadow-xl">
              <div className="relative">
                <img
                  src={birthdayGuy}
                  alt="The birthday person"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-lg border-4 border-primary/30"
                />
                {/* Decorative frame elements */}
                <div className="absolute -top-3 -left-3 text-3xl animate-bounce-gentle">🎈</div>
                <div className="absolute -top-3 -right-3 text-3xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🎉</div>
                <div className="absolute -bottom-3 -left-3 text-3xl animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🎂</div>
                <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce-gentle" style={{ animationDelay: '0.6s' }}>💖</div>
              </div>
              <p className="text-center mt-4 text-lg font-bold gradient-text">
                My birthday girl ⭐(imma eat you up)
              </p>
               <p className="text-center mt-4 text-lg font-bold gradient-text">
                imma eat your cake 
              </p>
                  <p className="text-center mt-4 text-lg font-bold gradient-text">
               and add some frosting in your mouth
              </p>
              
            </div>
          </div>

          {/* Final message */}
     <div className="relative">
  {/* Decorative border effects */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
  
  {/* Main card */}
  <div className="relative glass-card rounded-3xl p-8 max-w-2xl border-4 border-pink-400/50 shadow-2xl animate-fade-in-scale">
    {/* Decorative corners */}
    <div className="absolute top-0 left-0 text-6xl -mt-6 -ml-6">🎉</div>
    <div className="absolute top-0 right-0 text-6xl -mt-6 -mr-6">🎂</div>
    <div className="absolute bottom-0 left-0 text-6xl -mb-6 -ml-6">💝</div>
    <div className="absolute bottom-0 right-0 text-6xl -mb-6 -mr-6">✨</div>
    
    {/* Content */}
    <div className="text-center space-y-6">
      <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        Happy Birthday
      </h1>
      
      <p className="text-4xl md:text-6xl font-bold text-foreground">
        {userName}! 🎉
      </p>
      
      <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
      
      <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
        i love you so fucking much 💖
      </p>
      
      <p className="text-xl md:text-2xl text-foreground/90">
        i dont ever want this to end 💖
      </p>
      
      <p className="text-xl md:text-2xl text-foreground/90">
        imma put my babies inside you
      </p>
      
      <div className="pt-4">
        <span className="text-6xl animate-bounce inline-block">❤️</span>
      </div>
    </div>
  </div>
</div>

          {/* Replay button */}
          <button
            onClick={handleReplay}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold 
                       shadow-lg hover:scale-105 active:scale-95 transition-transform mt-4"
          >
            🔄 Watch this masterpiece again
          </button>
        </>
      )}
    </div>
  );
};

export default GiftReveal;
