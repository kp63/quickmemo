import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = window.localStorage.getItem(key);
    return item !== null ? item : initialValue;
  });

  const setValue: React.Dispatch<React.SetStateAction<string>> = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, valueToStore);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue !== null ? event.newValue : initialValue;
        setStoredValue(newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as [string, React.Dispatch<React.SetStateAction<string>>];
}
