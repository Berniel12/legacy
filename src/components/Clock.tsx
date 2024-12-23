'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 win98-window px-4 py-1">
      {time}
    </div>
  );
}
