import { useEffect, useRef } from "react";

const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const handlerRef = useRef<NodeJS.Timeout>();

  const callBack = (...args: Parameters<T>) => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }
    handlerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, []);
  return callBack;
};
export default useDebouncedCallback;
