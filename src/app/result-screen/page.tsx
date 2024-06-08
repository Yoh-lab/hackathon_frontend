"use client";

import { Flex } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import styles from '../../styles/Home.module.css';

import React from 'react';
import CustomButton from '../../components/customButton';
import { ResultBar } from "../../components/resultBar";
import { useSimilarityScore } from "../contexts/similarityScoreContext";

// 類似度と酔っ払いタイプの配列
const drunkTypes = [
  {score: 25, type: 'まだ大丈夫!!'},
  {score: 50, type: '少し抑えて!!'},
  {score: 75, type: 'もう飲まないで！!'},
  {score: 100, type: '病院行き!!'},
];

export default function Home() {
  // 類似度を示す状態
  const { similarityScore } = useSimilarityScore();
  // 酔っ払いタイプの決定
  const drunkTypeIndex = drunkTypes.findIndex((item) => item.score >= similarityScore)

  return (
    <main className={styles.background}>
      {/* vhでレイアウトは調節しよう！ */}
      <Flex direction="column" justify="center" minH="100vh" gap={20}>
        <ResultBar />
        <Flex direction="column" align="center" justify="center" minH="40vh" gap={40}>
          <Text className={styles.text} align="center">{drunkTypes[drunkTypeIndex].type}</Text>
          <CustomButton
              to="/"
              width="450px"
              height="75px"
              fontSize="40px"
              padding="1.5rem"
              buttonColor="#F6F9F4" // ボタンの背景色
              textColor="#7648ec" // 文字の色
              iconSize="30px" // アイコンのサイズ
            >
              最初に戻る
          </CustomButton>
        </Flex>
      </Flex>
    </main>
  );
}