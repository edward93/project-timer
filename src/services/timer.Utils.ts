import { Timer } from "../types/timer.types";

/**
 * Converts `ms` milliseconds to hours, mins & seconds
 * @param ms - milliseconds
 */
export const toTimer = (ms: number): Timer => {
  const result: Timer = {
    hours: ms <= 0 ? 0 : Math.floor(ms / (1000 * 60 * 60)),
    mins: ms <= 0 ? 0 : Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
    secs: ms <= 0 ? 0 : Math.floor((ms % (1000 * 60)) / 1000),
  };

  return result;
};

/** Default timer */
export const defaultTimer = 5000 * 60; // 5mins;