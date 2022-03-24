import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = "") {
  const [storedValue, setStoredValue] = useState(initialValue);
  useEffect(() => {
    const item =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : false;
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key, setStoredValue]);

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
