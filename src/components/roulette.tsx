import React, { useState, useEffect, useRef } from 'react';

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export const Roulette = () => {
  // ルーレットの項目リスト
  const items = ['ポーズA','ポーズB','ポーズC','ポーズD'];
  // 現在表示されているルーレットの項目を示す状態
  const [currentItem, setCurrentItem] = useState<string>(items[0]);
  // ルーレットが回転しているかどうかの状態
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // setIntervalのIDを保持
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // ルーレット回転中
    if (isRunning) {
      // window.setIntervalは指定した時間間隔ごとに指定した関数を繰り返し実行
      intervalRef.current = window.setInterval(() => {
        // prevItem:現在表示されているルーレットの項目
        setCurrentItem(prevItem => {
          // currentIndex:prevItemがitems配列の中で何番目にあるか
          const currentIndex = items.indexOf(prevItem);
          // 
          const nextIndex = (currentIndex + 1) % items.length;
          return items[nextIndex];
        });
      }, 50);
    } else if (intervalRef.current) {
      // setIntervalのタイマーを停止
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        // setIntervalのタイマーを停止
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <Flex direction="column" align="center" justify="center" gap={20}>
      <Text fontSize='4xl'>{currentItem}</Text>
      {isRunning || (
        <Button colorScheme='teal' size='md' onClick={() => setIsRunning(true)}>ルーレットスタート！</Button>
      )}
      {isRunning && (
        <div>
        <Button colorScheme='teal' size='md' onClick={() => setIsRunning(false)}>ルーレットストップ！</Button>
        </div>
      )}
    </Flex>
  );
};