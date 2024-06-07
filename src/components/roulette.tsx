import React, { useState, useEffect, useRef } from 'react';

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export const Roulette = () => {
  const items = ['ポーズA','ポーズB','ポーズC','ポーズD'];
  const [currentItem, setCurrentItem] = useState<string>(items[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
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