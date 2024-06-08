import React, { createContext, useState, useEffect, useRef } from 'react';

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';
import { useCurrentPoseName } from '../app/contexts/currentPoseNameContext';
import CustomButton from './customButton';

// createContextでitemをコンポーネント間で共有できるようにする
export const ItemContext = createContext('')

export const Roulette = () => {
  // ルーレットの項目リスト
  const items = ['なんちゃってヨガ','さかな~','コナン'];
  // 現在表示されているルーレットの項目を示す状態
  const { currentPoseName, setCurrentPoseName } = useCurrentPoseName();
  // ルーレットが回転しているかどうかの状態
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // setIntervalのIDを保持
  const intervalRef = useRef<number | null>(null);
  // ポーズが決まったかどうか
  const [isPoseSelected, setIsPoseSelected] = useState<boolean>(false);

  useEffect(() => {
    // ルーレット回転中
    if (isRunning) {
      // window.setIntervalは指定した時間間隔ごとに指定した関数を繰り返し実行
      intervalRef.current = window.setInterval(() => {
        // prevItem:現在表示されているルーレットの項目
        setCurrentPoseName(prevItem => {
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

  // ルーレット止めたとき
  const stopRoulette = () => {
    setIsRunning(false);
    setIsPoseSelected(true)
  }

  return (
    <Flex direction="column" align="center" justify="center" gap={20}>
      <Text fontSize='4xl'>{currentPoseName}</Text>
      {isPoseSelected || isRunning || (
        <CustomButton
          width="450px"
          height="65px"
          fontSize="30px"
          padding="1.5rem"
          buttonColor="#F6F9F4" // ボタンの背景色
          textColor="#7648ec" // 文字の色
          iconSize="20px" // アイコンのサイズ
          onClick={() => setIsRunning(true)}
        >
          ルーレットスタート！
        </CustomButton>
      )}
      {isRunning && (
        <CustomButton
          width="450px"
          height="65px"
          fontSize="30px"
          padding="1.5rem"
          buttonColor="#F6F9F4" // ボタンの背景色
          textColor="#7648ec" // 文字の色
          iconSize="20px" // アイコンのサイズ
          onClick={stopRoulette}
        >
          ルーレットストップ！
        </CustomButton>
      )}
      {isPoseSelected &&(
        <CustomButton
          to="/show-example-screen"
          width="450px"
          height="65px"
          fontSize="30px"
          padding="1.5rem"
          buttonColor="#F6F9F4" // ボタンの背景色
          textColor="#7648ec" // 文字の色
          iconSize="20px" // アイコンのサイズ
        >
          ポーズ例を見てみよう！
        </CustomButton>
      )}
    </Flex>
  );
};