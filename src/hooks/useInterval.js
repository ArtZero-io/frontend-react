import { useRef, useEffect } from "react";

export default function useInterval(callback, timer) {
  const intervalIdRef = useRef();

  useEffect(() => {
    intervalIdRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const fn = () => {
      intervalIdRef.current();
    };
    if (timer !== null) {
      let intervalId = setInterval(fn, timer);
      return () => clearInterval(intervalId);
    }
  }, [timer]);
}
