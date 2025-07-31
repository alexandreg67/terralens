import { useState, useRef, useEffect } from 'react';

export const useTimeoutMessage = () => {
  const [message, setMessage] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showMessageWithTimeout = (newMessage: string, duration: number = 3000) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the new message
    setMessage(newMessage);

    // Clear the message after the specified duration
    timeoutRef.current = setTimeout(() => {
      setMessage('');
    }, duration);
  };

  const clearMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage('');
  };

  return {
    message,
    showMessageWithTimeout,
    clearMessage,
  };
};