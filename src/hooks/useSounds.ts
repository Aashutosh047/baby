import { useCallback, useRef } from "react";

// Free sound URLs from various sources
const SOUNDS = {
  oink: "https://www.soundjay.com/animal/sounds/pig-oink-2.mp3",
  pop: "https://www.soundjay.com/button/sounds/button-09.mp3",
  success: "https://www.soundjay.com/misc/sounds/magic-chime-01.mp3",
  whoosh: "https://www.soundjay.com/misc/sounds/whoosh-01.mp3",
  click: "https://www.soundjay.com/button/sounds/button-21.mp3",
  birthday: "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3",
  blow: "https://www.soundjay.com/misc/sounds/wind-01.mp3",
  tada: "https://www.soundjay.com/misc/sounds/magic-chime-03.mp3",
  countdown: "https://www.soundjay.com/button/sounds/beep-07.mp3",
  magical: "https://www.soundjay.com/misc/sounds/magic-chime-04.mp3",
};

type SoundName = keyof typeof SOUNDS;

export const useSounds = () => {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const playSound = useCallback((name: SoundName, volume: number = 0.5) => {
    try {
      let audio = audioCache.current.get(name);
      
      if (!audio) {
        audio = new Audio(SOUNDS[name]);
        audioCache.current.set(name, audio);
      }
      
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(() => {
        // Ignore autoplay errors - user needs to interact first
      });
    } catch (error) {
      console.log("Sound play error:", error);
    }
  }, []);

  const playOink = useCallback(() => playSound("oink", 0.6), [playSound]);
  const playPop = useCallback(() => playSound("pop", 0.4), [playSound]);
  const playSuccess = useCallback(() => playSound("success", 0.5), [playSound]);
  const playWhoosh = useCallback(() => playSound("whoosh", 0.3), [playSound]);
  const playClick = useCallback(() => playSound("click", 0.3), [playSound]);
  const playBirthday = useCallback(() => playSound("birthday", 0.6), [playSound]);
  const playBlow = useCallback(() => playSound("blow", 0.4), [playSound]);
  const playTada = useCallback(() => playSound("tada", 0.6), [playSound]);
  const playCountdown = useCallback(() => playSound("countdown", 0.4), [playSound]);
  const playMagical = useCallback(() => playSound("magical", 0.5), [playSound]);

  return {
    playSound,
    playOink,
    playPop,
    playSuccess,
    playWhoosh,
    playClick,
    playBirthday,
    playBlow,
    playTada,
    playCountdown,
    playMagical,
  };
};

export default useSounds;
