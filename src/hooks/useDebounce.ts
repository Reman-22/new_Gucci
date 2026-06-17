import { useState, useEffect } from "react";

/**
 * [PERFORMANCE] 
 * Delays the execution of a rapidly changing value (e.g., keystrokes in a search input).
 * Ensures that heavy DOM updates and filtering algorithms only run after the user pauses typing.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // [MEMORY LEAK PREVENTION] Clear the timeout if the value changes before the delay finishes,
    // or if the component unmounts.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
