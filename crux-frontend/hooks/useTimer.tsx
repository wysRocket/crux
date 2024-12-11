import {useState, useEffect} from 'react';

export const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const resetTimer = () => setTimeLeft(initialTime);

  return {timeLeft, resetTimer};
};
