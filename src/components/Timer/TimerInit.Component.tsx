import { useState } from "react";
import { defaultTimer, toTimer } from "../../services/timer.Utils";
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
  const [timer] = useState(defaultTimer);

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
  const time = toTimer(timer);

  return (
    <div className="timer-init-container">
      <section className="timer-init-display">
        H: {time.hours} | Mins: {time.mins} | Secs: {time.secs}
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
