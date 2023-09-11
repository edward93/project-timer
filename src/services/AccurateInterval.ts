/**
 * Accurate Interval type
 */
export type AccurateIntervalType = {
  stop: CallableFunction;
  start: CallableFunction;
};
/**
 * Slightly more accurate alternative to built in `setInterval` function using `setTimeout`
 *
 * @param callback - Callback function to run per `interval` milliseconds
 * @param interval - Interval in milliseconds
 * @returns - Accurate Interval handler (with `start` & `stop` functions)
 */
export const AccurateInterval = (callback: CallableFunction, interval: number): AccurateIntervalType => {
  let expected = Date.now() + interval;
  let handler: number | undefined = undefined;

  const step = () => {
    // current time
    const currentTime = Date.now();
    // timer drift
    const drift = currentTime - expected;

    // TODO: improve this
    if (drift > interval) {
      // If we've drifted more than one interval, adjust the expected time
      expected = currentTime + interval;
    }

    // call our callback function
    callback();

    // update the expect time and the delay
    expected += interval;
    const delay = Math.max(0, interval - drift);

    handler = setTimeout(step, delay);
  };

  /**
   * Stops the interval
   */
  const stop = () => {
    if (handler) {
      clearTimeout(handler);
      //
      handler = undefined;
    }
  };

  /**
   * Starts the interval
   */
  const start = () => {
    if (!handler) {
      handler = setTimeout(step, interval);
    }
  };

  return { start, stop };
};