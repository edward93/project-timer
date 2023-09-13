type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type TimerHour = number & Range<0, 24>;

export type TimerMin = number & Range<0, 60>;

export type TimerSec = Range<0, 60>;

export type Timer = {
  hours: number | string; //TimerHour;
  mins: number | string; // TimerMin;
  secs: number | string; //TimerSec;
};
