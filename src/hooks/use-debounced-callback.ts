import { useEffect, useRef } from "react";

type TUseDebouncedCallback = {
  callback: () => void;
  delay: number;
};

const useDebouncedCallback = ({ callback, delay }: TUseDebouncedCallback) => {
  const handlerRef = useRef<any>();

  const callBack = () => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }
    handlerRef.current = setTimeout(() => {
      callback();
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
