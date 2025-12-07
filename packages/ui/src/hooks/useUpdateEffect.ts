import { useRef, useEffect } from 'react';

export default function useUpdateEffect(fn: () => void, arr: any[]) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current !== true) fn();
    first.current = false;
  }, arr);
}
