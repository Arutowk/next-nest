import { RefObject, useEffect } from 'react';

function useClickOutside(refs: RefObject<HTMLElement>[], callback: () => void) {
  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      let notIn = true;
      for (const ref of refs) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          notIn = false;
        }
      }
      if (notIn === true) callback();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [refs, callback]);
}

export default useClickOutside;
