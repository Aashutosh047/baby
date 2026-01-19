import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import FloatingDecorations from "@/components/FloatingDecorations";
import PigCharacter from "@/components/PigCharacter";
import SpeechBubble from "@/components/SpeechBubble";
import TypewriterText from "@/components/TypewriterText";
import ProgressTimeline from "@/components/ProgressTimeline";
import BalloonGame from "@/components/BalloonGame";
import PhotoGallery from "@/components/PhotoGallery";
import BirthdayCake from "@/components/BirthdayCake";
import GiftReveal from "@/components/GiftReveal";
import useSounds from "@/hooks/useSounds";

type Stage = 
  | "loading"
  | "welcome"
  | "askName"
  | "nameReaction"
  | "magicWordIntro"
  | "magicWord"
  | "magicWordSuccess"
  | "balloonIntro"
  | "balloonGame"
  | "countdown"
  | "cake"
  | "wishMade"
  | "photoIntro"
  | "photoGallery"
  | "giftIntro"
  | "gift"
  | "finale";

const stages: string[] = [
  "Welcome",
  "Name",
  "Magic",
  "Game",
  "Cake",
  "Photos",
  "Gift",
];

const wrongGuessResponses = [
  "Nope! Think like a pig... 🐷",
  "Wrong! What sound does a pig make? 🤔",
  "Try again! Hint: It rhymes with 'boink'... kinda 😅",
  "Still wrong! Just say what I say all day! 🐽",
  "Okay okay... it starts with 'O' and ends with 'INK'! 💕",
  "OINK! JUST SAY OINK! 🐷💀",
];

const Index = () => {
  const [stage, setStage] = useState<Stage>("loading");
  const [stageIndex, setStageIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const { playWhoosh, playSuccess, playClick, playCountdown, playTada, playMagical } = useSounds();

  // Loading animation
  useEffect(() => {
    if (stage === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            playWhoosh();
            setTimeout(() => setStage("welcome"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage, playWhoosh]);

  // Auto-advance for certain stages
  useEffect(() => {
    const autoAdvanceStages: { [key in Stage]?: { next: Stage; delay: number; indexChange?: number } } = {
      welcome: { next: "askName", delay: 3000, indexChange: 1 },
      nameReaction: { next: "magicWordIntro", delay: 3500 },
      magicWordIntro: { next: "magicWord", delay: 3000, indexChange: 2 },
      magicWordSuccess: { next: "balloonIntro", delay: 2500 },
      balloonIntro: { next: "balloonGame", delay: 3000, indexChange: 3 },
      wishMade: { next: "photoIntro", delay: 3000 },
      photoIntro: { next: "photoGallery", delay: 2500, indexChange: 5 },
      giftIntro: { next: "gift", delay: 3000, indexChange: 6 },
    };

    const config = autoAdvanceStages[stage];
    if (config) {
      const timer = setTimeout(() => {
        playWhoosh();
        setStage(config.next);
        if (config.indexChange !== undefined) {
          setStageIndex(config.indexChange);
        }
      }, config.delay);
      return () => clearTimeout(timer);
    }
  }, [stage, playWhoosh]);

  // Countdown timer
  useEffect(() => {
    if (stage === "countdown" && countdown > 0) {
      playCountdown();
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (stage === "countdown" && countdown === 0) {
      playTada();
      setTimeout(() => {
        setStage("cake");
        setStageIndex(4);
      }, 500);
    }
  }, [stage, countdown, playCountdown, playTada]);

  const handleNameSubmit = useCallback(() => {
    if (inputValue.trim()) {
      playClick();
      setUserName(inputValue.trim());
      setInputValue("");
      setStage("nameReaction");
    }
  }, [inputValue, playClick]);

  const handleMagicWordGuess = useCallback(() => {
    const guess = inputValue.toLowerCase().trim();
    if (guess === "oink") {
      // Success!
      playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff"],
      });
      setStage("magicWordSuccess");
      setInputValue("");
    } else {
      playClick();
      setGuessAttempts((prev) => prev + 1);
      setInputValue("");
    }
  }, [inputValue, playSuccess, playClick]);

  const handleBalloonGameComplete = useCallback(() => {
    setCountdown(5);
    setTimeout(() => setStage("countdown"), 1000);
  }, []);

  const handleCakeBlowOut = useCallback(() => {
    playMagical();
    setStage("wishMade");
  }, [playMagical]);

  const handlePhotoGalleryComplete = useCallback(() => {
    playWhoosh();
    setStage("giftIntro");
  }, [playWhoosh]);

  const handleReplay = useCallback(() => {
    playClick();
    setStage("loading");
    setStageIndex(0);
    setUserName("");
    setInputValue("");
    setGuessAttempts(0);
    setCountdown(5);
    setLoadingProgress(0);
  }, [playClick]);

  const renderStage = () => {
    switch (stage) {
      case "loading":
        return (
          <div className="flex flex-col items-center gap-8">
            <PigCharacter variant="normal" size="large" />
            <div className="w-64 h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-100 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <TypewriterText
              text="Preparing something special..."
              speed={60}
              className="text-xl font-semibold text-foreground"
            />
          </div>
        );

      case "welcome":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="excited" size="large" />
            <SpeechBubble>
              <TypewriterText
                text="Hiii! I'm Piggy! 🐷✨ I have a super special surprise for you!"
                speed={40}
                className="text-xl font-semibold text-foreground text-center block"
              />
            </SpeechBubble>
          </div>
        );

      case "askName":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="normal" size="medium" />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center mb-4">
                But first... what's your name? 🤗
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                  placeholder="Type your name..."
                  className="flex-1 px-4 py-3 rounded-full border-2 border-primary/30 bg-background 
                           focus:border-primary focus:outline-none font-medium text-foreground"
                  autoFocus
                />
                <button
                  onClick={handleNameSubmit}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold
                           hover:scale-105 active:scale-95 transition-transform"
                >
                  ✓
                </button>
              </div>
            </SpeechBubble>
          </div>
        );

      case "nameReaction":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="excited" size="medium" animate />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center">
                OMG!! {userName}?! 😍
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2">
                That's like THE best name ever! I love it! 💖
              </p>
            </SpeechBubble>
          </div>
        );

      case "magicWordIntro":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="normal" size="medium" />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center">
                Okay {userName}, to unlock your surprise...
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2">
                You need to say the ✨MAGIC WORD✨
              </p>
            </SpeechBubble>
          </div>
        );

      case "magicWord":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter 
              variant="normal" 
              size="medium" 
              className={guessAttempts > 0 ? "animate-shake" : ""}
            />
            <SpeechBubble>
              <p className="text-lg font-semibold text-foreground text-center mb-2">
                What's the magic word? 🪄
              </p>
              {guessAttempts > 0 && (
                <p className="text-primary text-center mb-3 animate-pop-in font-medium">
                  {wrongGuessResponses[Math.min(guessAttempts - 1, wrongGuessResponses.length - 1)]}
                </p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleMagicWordGuess()}
                  placeholder="Say the magic word..."
                  className="flex-1 px-4 py-3 rounded-full border-2 border-primary/30 bg-background 
                           focus:border-primary focus:outline-none font-medium text-foreground"
                  autoFocus
                />
                <button
                  onClick={handleMagicWordGuess}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold
                           hover:scale-105 active:scale-95 transition-transform"
                >
                  🪄
                </button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Attempts: {guessAttempts}
              </p>
            </SpeechBubble>
          </div>
        );

      case "magicWordSuccess":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="excited" size="large" />
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-bounce-in">
                OINK OINK! 🐷🎉
              </h2>
              <p className="text-xl text-foreground animate-slide-up">
                You got it {userName}! You speak PIG! 💕
              </p>
            </div>
          </div>
        );

      case "balloonIntro":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="party" size="medium" />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center">
                Time for a mini-game! 🎮
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2">
                Pop 10 balloons to continue! 🎈
              </p>
            </SpeechBubble>
          </div>
        );

      case "balloonGame":
        return <BalloonGame targetPops={10} onComplete={handleBalloonGameComplete} />;

      case "countdown":
        return (
          <div className="flex flex-col items-center gap-8">
            <p className="text-2xl font-semibold text-foreground">
              Get ready {userName}...
            </p>
            <div className="text-9xl font-bold gradient-text animate-bounce-in" key={countdown}>
              {countdown || "🎂"}
            </div>
            <PigCharacter variant="excited" size="small" />
          </div>
        );

      case "cake":
        return <BirthdayCake userName={userName} onBlowOut={handleCakeBlowOut} />;

      case "wishMade":
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="text-6xl animate-grow-shrink">🌟</div>
            <p className="text-2xl font-bold gradient-text text-center">
              Wish recorded! ✨
            </p>
            <p className="text-lg text-muted-foreground text-center">
              The universe is now processing your wish...
            </p>
            <PigCharacter variant="normal" size="small" />
          </div>
        );

      case "photoIntro":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="party" size="medium" />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center">
                Now let's look at some memories! 📸
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2">
                I found some totally real photos of you! 👀
              </p>
            </SpeechBubble>
          </div>
        );

      case "photoGallery":
        return <PhotoGallery userName={userName} onComplete={handlePhotoGalleryComplete} />;

      case "giftIntro":
        return (
          <div className="flex flex-col items-center gap-6">
            <PigCharacter variant="excited" size="medium" />
            <SpeechBubble>
              <p className="text-xl font-semibold text-foreground text-center">
                And finally... 🎁
              </p>
              <p className="text-lg text-muted-foreground text-center mt-2">
                The moment you've been waiting for!
              </p>
            </SpeechBubble>
          </div>
        );

      case "gift":
        return <GiftReveal userName={userName} onReplay={handleReplay} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingDecorations />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {renderStage()}
      </div>

      {stage !== "loading" && (
        <ProgressTimeline stages={stages} currentStage={stageIndex} />
      )}
    </div>
  );
};

export default Index;
