"use client";


import { Flex } from "@chakra-ui/react";
import styles from '../../styles/Home.module.css';

import React from 'react';
import CustomButton from '../../components/customButton';

import { Roulette } from "../../components/roulette";


export default function Home() {
  return (
    <main className={styles.background}>
      <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
        <Roulette />
        {/* <Button colorScheme='teal' size='md'>ルーレットスタート！</Button> */}
        {/* <Link href="/show-example-screen"><Button colorScheme='teal' size='md'>ポーズ例を見てみよう！</Button></Link> */}
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
        </CustomButton>
      </Flex>
    </main>
  );
}
