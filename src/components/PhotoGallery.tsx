import { useState, useEffect } from "react";
import useSounds from "@/hooks/useSounds";

interface Photo {
  id: number;
  imageUrl?: string;
  emoji?: string;
  caption: string;
  pigComment: string;
}

interface PhotoGalleryProps {
  userName: string;
  onComplete: () => void;
}

const PhotoGallery = ({ userName, onComplete }: PhotoGalleryProps) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const { playClick, playWhoosh } = useSounds();

  // Define your photos with direct paths
  // Place your images in the public folder and reference them like: "/images/photo1.jpg"
  // OR import them at the top like: import photo1 from './assets/photo1.jpg'
  const photos: Photo[] = [
    {
      id: 1,
      imageUrl: "src/components/photos/baby.jpg", // REPLACE with your image path
      emoji: "👶", // Fallback emoji
      caption: `Baby ${userName}`,
      pigComment: "Omg so smol and squishy! chosi bachai dekhi",
    },
    {
      id: 2,
      imageUrl: "src/components/photos/thigh.jpg", // REPLACE with your image path
      emoji: "🎂",
      caption: "sexy amisha",
      pigComment: "amisha and me both staring at menu ,thighs we so juicy",
    },
    {
      id: 3,
      imageUrl: "src/components/photos/sleep.jpg", // REPLACE with your image path
      emoji: "📚",
      caption: "sleeping beauty",
      pigComment: "kosko photoho  bhandai sodha na malai",
    },
    {
      id: 4,
      imageUrl: "src/components/photos/jadu.jpg", // REPLACE with your image path
      emoji: "🎉",
      caption: "om-om-om-om",
      pigComment: "jaduuuu jaduuuuuu",
    },
    {
      id: 5,
      imageUrl: "src/components/photos/cum.jpg", // REPLACE with your image path
      emoji: "⭐",
      caption: "aakha ma k paryo",
      pigComment: `${userName} remember what i am capable of ✨`,
    },
      {
      id: 5,
      imageUrl: "src/components/photos/hot.jpg", // REPLACE with your image path
      emoji: "⭐",
      caption: "Today's superstar",
      pigComment: `${userName} the hottest thing to ever exist i wanna eat you  ✨`,
    },
  ];

  useEffect(() => {
    // Show comment after photo appears
    const commentTimer = setTimeout(() => setShowComment(true), 1000);
    return () => clearTimeout(commentTimer);
  }, [currentPhoto]);

  const nextPhoto = () => {
    playClick();
    setShowComment(false);
    if (currentPhoto < photos.length - 1) {
      setTimeout(() => {
        playWhoosh();
        setCurrentPhoto((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(onComplete, 500);
    }
  };

  const photo = photos[currentPhoto];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Photo counter */}
      <div className="text-muted-foreground font-medium">
        📸 Memory {currentPhoto + 1} of {photos.length}
      </div>

      {/* Polaroid photo */}
      <div
        className="glass-card p-4 pb-16 rounded-lg shadow-xl animate-fade-in-scale cursor-pointer hover:scale-105 transition-transform"
        onClick={nextPhoto}
        style={{
          transform: `rotate(${-3 + Math.random() * 6}deg)`,
        }}
      >
        <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-peach to-pig-blush rounded-lg flex items-center justify-center overflow-hidden">
          {photo.imageUrl ? (
            <img 
              src={photo.imageUrl} 
              alt={photo.caption}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, hide it and show emoji
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-7xl md:text-8xl">{photo.emoji}</span>
          )}
        </div>
        <p className="text-center mt-4 font-semibold text-foreground">
          {photo.caption}
        </p>
      </div>

      {/* Pig comment */}
      {showComment && (
        <div className="glass-card rounded-2xl px-4 py-3 animate-slide-up max-w-xs text-center">
          <p className="text-lg font-medium text-foreground">
            🐷 {photo.pigComment}
          </p>
        </div>
      )}

      {/* Tap hint */}
      <p className="text-muted-foreground text-sm animate-pulse">
        Tap photo to continue →
      </p>
    </div>
  );
};

export default PhotoGallery;