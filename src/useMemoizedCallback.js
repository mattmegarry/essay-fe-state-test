import React from "react";

const useMemoizedCallback = (callback, inputs = []) => {
  // Instance var to hold the actual callback.
  const callbackRef = React.useRef(callback);

  // The memoized callback that won't change and calls the changed callbackRef.
  const memoizedCallback = React.useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);

  // The callback that is constantly updated according to the inputs.
  const updatedCallback = React.useCallback(callback, inputs);

  // The effect updates the callbackRef depending on the inputs.
  React.useEffect(() => {
    callbackRef.current = updatedCallback;
  }, [updatedCallback]);

  // Return the memoized callback.
  return memoizedCallback;
};

export default useMemoizedCallback;
