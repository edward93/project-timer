import { useState, useEffect } from "react";
import { AccurateInterval, AccurateIntervalType } from "../../services/AccurateInterval";
import { useParams } from "react-router-dom";
import { defaultTimer, toTimer } from "../../services/timer.Utils";

/** Accurate interval */
let interval: AccurateIntervalType;

/** Accurate interval timeout */
const intervalTimeout = 1000;

/**
 * Component that renders the timer (countdown)
 * We assume that the timer (start) has already been started, no future timers are supported yet
 *
 * @returns - Timer component
 */
const TimerComponent = () => {
  // get start and end params from the url
  const { tStart, tEnd } = useParams();

  // actual start and end
  const start = tStart ? +tStart : Date.now();
  const end = tEnd ? +tEnd : Date.now() + defaultTimer;

  // timer (ms left)
  const [timer, setTimer] = useState(end - Math.max(start, Date.now()));
  // is this timer valid
  const isValid = timer > 0;
  // init the timer
  useEffect(() => {
    // start the timer only if it's valid
    if (isValid) {
      // init interval
      interval = AccurateInterval(update, intervalTimeout);

      // start the interval
      interval.start();

      // cleanup
      return () => interval.stop();
    }
  }, []);

  /**
   * This function is called every `intervalTimeout` milliseconds
   */
  const update = () => {
    // console.log("tic");
    setTimer((prevTime: number) => {
      const newTime = prevTime - intervalTimeout;

      if (newTime <= 0) {
        interval.stop();
        // time's up
        onTimeUp();
      }

      return Math.max(0, newTime);
    });
  };

  /**
   * Runs when the timer hits 0
   */
  const onTimeUp = () => {
    console.log("TIME IS UP");
  };

  const time = toTimer(timer);
  return (
    <div className="timer-container">
      <section className="timer">
        H: {time.hours} | Mins: {time.mins} | Secs: {time.secs}
      </section>
    </div>
  );
};

export default TimerComponent;
