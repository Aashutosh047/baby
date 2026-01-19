import { useState, useEffect, useCallback } from "react";
import useSounds from "@/hooks/useSounds";

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  popped: boolean;
}

interface BalloonGameProps {
  targetPops: number;
  onComplete: () => void;
}

const colors = [
  "bg-primary",
  "bg-coral",
  "bg-peach",
  "bg-pig-pink",
  "bg-accent",
];

const BalloonGame = ({ targetPops, onComplete }: BalloonGameProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);
  const { playPop, playSuccess } = useSounds();

  // Spawn balloons
  useEffect(() => {
    const spawnBalloon = () => {
      const newBalloon: Balloon = {
        id: Date.now() + Math.random(),
        x: 10 + Math.random() * 80,
        y: 110,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.8 + Math.random() * 0.8,
        popped: false,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    };

    const interval = setInterval(spawnBalloon, 800);
    return () => clearInterval(interval);
  }, []);

  // Move balloons up
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -20 && !b.popped)
      );
    }, 50);
    return () => clearInterval(moveInterval);
  }, []);

  const popBalloon = useCallback(
    (id: number) => {
      playPop();
      setBalloons((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
      );
      const newCount = poppedCount + 1;
      setPoppedCount(newCount);
      setShowInstruction(false);

      if (newCount >= targetPops) {
        playSuccess();
        setTimeout(onComplete, 500);
      }
    },
    [poppedCount, targetPops, onComplete, playPop, playSuccess]
  );

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden">
      {/* Score */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <div className="glass-card rounded-full px-6 py-3">
          <span className="text-2xl font-bold gradient-text">
            🎈 {poppedCount} / {targetPops}
          </span>
        </div>
      </div>

      {/* Instruction */}
      {showInstruction && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 animate-bounce-gentle">
          <div className="glass-card rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-semibold text-foreground">
              👆 Pop the balloons!
            </p>
          </div>
        </div>
      )}

      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute cursor-pointer transition-transform hover:scale-110 ${
            balloon.popped ? "animate-pop-in scale-0" : "animate-balloon"
          }`}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => !balloon.popped && popBalloon(balloon.id)}
        >
          <div
            className={`w-12 h-16 ${balloon.color} rounded-full relative shadow-lg`}
          >
            {/* Balloon highlight */}
            <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full" />
            {/* String */}
            <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-foreground/30" />
          </div>
        </div>
      ))}

      {/* Completion celebration */}
      {poppedCount >= targetPops && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-6xl animate-bounce-in">🎉</div>
        </div>
      )}
    </div>
  );
};

export default BalloonGame;
