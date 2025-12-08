import { useCallback, useRef } from 'react';

export function useDebounce(callback, delay = 1000) {
  const lastCallRef = useRef(0);

  const debouncedCallback = useCallback((...args) => {
    const now = Date.now();
    
    // Prevent calls within the delay period
    if (now - lastCallRef.current < delay) {
      return;
    }

    lastCallRef.current = now;
    callback(...args);
  }, [callback, delay]);

  return debouncedCallback;
}
