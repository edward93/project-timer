import { useState, useEffect, useRef } from "react";
import { AccurateInterval, AccurateIntervalType } from "../../services/AccurateInterval";
import { useParams } from "react-router-dom";
import { defaultTimer, toTimer } from "../../services/timer.Utils";
import "../../styles/timer.scss";
import { useKeepTabAlive } from "../../services/hooks/useKeepTabAlive";

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

  // keep the tab alive when timer is running
  // const [cancel] = useKeepTabAlive();

  // actual start and end
  const start = tStart ? +tStart : Date.now();
  const end = tEnd ? +tEnd : Date.now() + defaultTimer;

  // timer (ms left)
  const [timer, setTimer] = useState(end - Math.max(start, Date.now()));
  // is this timer valid
  const isValid = timer > 0;

  // init the timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Tab is now visible (active)
        // Add your code to restart the timer or perform any necessary actions
        console.log("Tab is now active. Restarting timer...");
        setTimer(end - Date.now());
      } else {
        // Tab is now in the background (asleep)
        // You can pause or stop your timer here if needed
        console.log("Tab is now in the background.");
      }
    };

    // Add an event listener to detect visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // start the timer only if it's valid
    if (isValid) {
      // init interval
      interval = AccurateInterval(update, intervalTimeout);

      // start the interval
      interval.start();

      // cleanup
      return () => {
        interval.stop();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
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
    // cancel();
  };

  const time = toTimer(timer, true);
  return (
    <div className="timer-container">
      <section className="timer">
        <section className="timer-digits">
          <div className="timer-hour timer-digits">
            <h1>{time.hours}</h1>
          </div>
          <div className="timer-mins timer-digits">
            <h1>{time.mins}</h1>
          </div>
          <div className="timer-secs timer-digits">
            <h1>{time.secs}</h1>
          </div>
        </section>
        <section className="timer-labels">
          <div className="timer-hour-label timer-label">Hours</div>
          <div className="timer-min-label timer-label">Mins</div>
          <div className="timer-sec-label timer-label">Secs</div>
        </section>
      </section>
    </div>
  );
};

export default TimerComponent;
