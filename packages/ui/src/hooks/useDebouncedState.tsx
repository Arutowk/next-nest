import { useEffect, useState } from 'react';

export default function useDebouncedState<T>(initialState: T, delay: number) {
  const [state, setState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(state), delay);
    return () => clearTimeout(timer);
  }, [state, delay]);

  return [state, debouncedState, setState] as const;
}
