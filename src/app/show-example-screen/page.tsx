"use client";

import { Flex } from "@chakra-ui/react";
import { ShowPose } from "../../components/showPose";
import styles from '../../styles/Home.module.css';

import React from 'react';
import CustomButton from '../../components/customButton';

export default function Home() {
  return (
    <main className={styles.background}>
      <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
        <ShowPose />
        {/* <Link href="/shooting-screen"><Button colorScheme='teal' size='md'>撮影開始！</Button></Link> */}
        <CustomButton
            to="/shooting-screen"
            width="450px"
            height="65px"
            fontSize="30px"
            padding="1.5rem"
            buttonColor="#F6F9F4" // ボタンの背景色
            textColor="#7648ec" // 文字の色
            iconSize="20px" // アイコンのサイズ
          >
            撮影スタート！　
          </CustomButton>
      </Flex>
    </main>
  );
}
