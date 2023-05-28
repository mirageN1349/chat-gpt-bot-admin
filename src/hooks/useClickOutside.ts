import { useEffect, RefObject } from 'react';

type Props<T extends HTMLElement> = {
  ref: RefObject<T>;
  handler: (event: MouseEvent | TouchEvent) => void;
  exceptions?: RefObject<HTMLElement>[];
};

export function useClickOutside<T extends HTMLElement>({
  ref,
  handler,
  exceptions,
}: Props<T>) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !ref.current ||
        ref.current.contains(event?.target as Node) ||
        exceptions?.every(el => el.current?.contains(event?.target as Node))
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
