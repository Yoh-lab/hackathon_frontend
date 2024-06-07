import React, { useState, useEffect, useRef } from 'react';

export const Roulette = () => {
  const items = ['ポーズA','ポーズB','ポーズC'];
  const [currentItem, setCurrentItem] = useState<string>(items[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setCurrentItem(prevItem => {
          const currentIndex = items.indexOf(prevItem);
          const nextIndex = (currentIndex + 1) % items.length;
          return items[nextIndex];
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startRoulette = () => {
    setResult(null);
    setIsRunning(true);
  };

  const stopRoulette = () => {
    if (isRunning) {
      setIsRunning(false);
      setTimeout(() => {
        setResult(currentItem);
      }, 1000); // ルーレットが停止した後に結果を表示
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ルーレット</h1>
      <div style={{ fontSize: '50px', margin: '20px' }}>{currentItem}</div>
      <div>
        <button onClick={startRoulette} disabled={isRunning}>
          開始
        </button>
        <button onClick={stopRoulette} disabled={!isRunning}>
          停止
        </button>
      </div>
      {result && (
        <div style={{ marginTop: '20px', fontSize: '30px' }}>
          結果: {result}
        </div>
      )}
    </div>
  );
};