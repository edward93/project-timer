import { useEffect } from "react";
import audioSrc from "../../assets/cricket-chirp-101026.mp3";

let audio: HTMLAudioElement | undefined;

/**
 * Hook that will keep the tab alive until the component unmounts or `cancel` is called.
 * It will not restart until the component mounts again
 *
 * @returns [cancel] - to cancel the effect
 */
export const useKeepTabAlive = () => {
  // const audio = useRef<HTMLAudioElement>();
  let isPlaying = false;

  const cancel = () => {
    if (audio) {
      audio.load();
      isPlaying = false;
      // free up the resource
      audio = undefined;
    }
  };

  // run this once the component mounts (once)
  useEffect(() => {
    audio = new Audio();
    audio.src = audioSrc;
    audio.volume = 0;
    // audio.current.muted = true;

    // loop
    audio.loop = true;

    // play the audio
    audio
      .play()
      .then(() => {
        isPlaying = true;
      })
      .catch((error) => {
        console.error("This error can probably ignored - ", error);
        isPlaying = false;
      });

    // when unmounted, cancel it
    return () => {
      cancel();
    };
  }, []);

  return [cancel];
};
