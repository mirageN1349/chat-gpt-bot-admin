import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, timeout: number) {
  const [debouncedValue, setDebouncedValue] = useState<null | T>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);

  return debouncedValue;
}
