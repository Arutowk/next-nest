import { useEffect, useState } from 'react';

export default function useDebouncedState(initialState: any, delay: number) {
  const [state, setState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedState(state), delay);
    return () => clearTimeout(timer);
  }, [state]);

  return [state, debouncedState, setState];
}
