import { useEffect, useState } from "react";

interface Decoration {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const emojis = ["🎈", "💖", "✨", "🌸", "🎀", "💕", "⭐", "🌷", "🎉", "💗"];

const FloatingDecorations = () => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  useEffect(() => {
    const items: Decoration[] = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
        size: 1.2 + Math.random() * 1.5,
      });
    }
    setDecorations(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((dec) => (
        <div
          key={dec.id}
          className="absolute animate-float-slow"
          style={{
            left: `${dec.left}%`,
            top: `${-10 + Math.random() * 110}%`,
            animationDelay: `${dec.delay}s`,
            animationDuration: `${dec.duration}s`,
            fontSize: `${dec.size}rem`,
            opacity: 0.7,
          }}
        >
          {dec.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingDecorations;