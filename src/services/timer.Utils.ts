import { Timer } from "../types/timer.types";

/**
 * Converts `ms` milliseconds to hours, mins & seconds
 * @param ms - milliseconds
 */
export const toTimer = (ms: number, format: boolean = false): Timer => {
  const result: Timer = {
    hours: ms <= 0 ? 0 : Math.floor(ms / (1000 * 60 * 60)),
    mins: ms <= 0 ? 0 : Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
    secs: ms <= 0 ? 0 : Math.floor((ms % (1000 * 60)) / 1000),
  };

  if (format) {
    result.hours = +result.hours < 10 ? `0${result.hours}` : `${result.hours}`;
    result.mins = +result.mins < 10 ? `0${result.mins}` : `${result.mins}`;
    result.secs = +result.secs < 10 ? `0${result.secs}` : `${result.secs}`;
  }

  return result;
};

/** Time enum */
export enum TimeEnum {
  Hour = 1,
  Min = 2,
  Sec = 3,
}

/** Default timer */
export const defaultTimer = 5000 * 60; // 5mins;
