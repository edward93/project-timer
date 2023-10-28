import { useState } from "react";
import { TimeEnum, defaultTimer, toTimer } from "../../services/timer.Utils";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../../styles/timer.init.scss";

// TODO: add the ability to set the timer
/**
 * Component to set desired timer and start it
 *
 * @returns Timer init component
 */
const TimerInitComponent = () => {
  // page navigation
  const navigate = useNavigate();

  // editable timer
  const [timer, setTimer] = useState(defaultTimer);

  /**
   * Starts the timer
   * @param event - Btn click event
   */
  const onStartTimerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // calculate start and end times
    const startTime = Date.now() + 200; // 200ms buffer
    const endTime = startTime + timer;

    // unique id
    const id = uuidv4();

    // navigate to the Timer component and start the timer
    navigate(`/timer/${id}/${startTime}/${endTime}`);
  };

  // formatted timer
  const time = toTimer(timer, true);

  /**
   * Increments Hours, Mins or Seconds
   * @param timeEnum - Which part to increment
   */
  const incrementTimer = (timeEnum: TimeEnum) => {
    let increment = 1;
    if (timeEnum === TimeEnum.Hour) increment *= 60 * 60 * 1000; // 1hour in ms
    if (timeEnum === TimeEnum.Min) increment *= 60 * 1000; // 1 min in ms
    if (timeEnum === TimeEnum.Sec) increment *= 1000; // 1sec in ms

    const newTimer = timer + increment;
    setTimer(newTimer);
  };

  /**
   * Decrement Hours, Mins or Seconds
   * @param timeEnum - Which part to increment
   */
  const decrementTimer = (timeEnum: TimeEnum) => {
    let increment = 1;
    if (timeEnum === TimeEnum.Hour) increment *= 60 * 60 * 1000; // 1hour in ms
    if (timeEnum === TimeEnum.Min) increment *= 60 * 1000; // 1 min in ms
    if (timeEnum === TimeEnum.Sec) increment *= 1000; // 1sec in ms
    
    const newTimer = timer - increment <= 0 ? 0 : timer - increment;
    setTimer(newTimer);
  };

  return (
    <div className="timer-init-container">
      <section className="timer">
        <section className="timer-digits">
          <div className="timer-hour timer-digits">
            <div className="timer-adj-arrow arrow-up"onClick={() => incrementTimer(TimeEnum.Hour)}></div>
            <h1>{time.hours}</h1>
            <div className="timer-adj-arrow arrow-down"onClick={() => decrementTimer(TimeEnum.Hour)}></div>
          </div>
          <div className="timer-mins timer-digits">
            <div className="timer-adj-arrow arrow-up" onClick={() => incrementTimer(TimeEnum.Min)}></div>
            <h1>{time.mins}</h1>
            <div className="timer-adj-arrow arrow-down"onClick={() => decrementTimer(TimeEnum.Min)}></div>
          </div>
          <div className="timer-secs timer-digits">
            <div className="timer-adj-arrow arrow-up" onClick={() => incrementTimer(TimeEnum.Sec)}></div>
            <h1>{time.secs}</h1>
            <div className="timer-adj-arrow arrow-down" onClick={() => decrementTimer(TimeEnum.Sec)}></div>
          </div>
        </section>
        <section className="timer-labels">
          <div className="timer-hour-label timer-label">Hours</div>
          <div className="timer-min-label timer-label">Mins</div>
          <div className="timer-sec-label timer-label">Secs</div>
        </section>
      </section>
      <div className="timer-init-actions">
        <button className="timer-start-btn ghost-btn" onClick={onStartTimerClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default TimerInitComponent;
