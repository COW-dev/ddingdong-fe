import { useEffect, RefObject } from 'react';

type UseClickOutsideProps<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T | null>;
  handler: () => void;
  enabled?: boolean;
};

export function useClickOutside<T extends HTMLElement>({ ref, handler }: UseClickOutsideProps<T>) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}
