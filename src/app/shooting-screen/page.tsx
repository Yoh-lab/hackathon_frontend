"use client";

import { Flex } from "@chakra-ui/react";
import styles from '../../styles/Home.module.css';

import React from 'react';
import CustomButton from '../../components/customButton';

import { WebCam_Window } from "../../components/webcam";

export default function Home() {
  return (
    <main className={styles.background}>
      <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
        <WebCam_Window />
        {/* <Link href="/result-screen"><Button colorScheme='teal' size='md'>診断結果！</Button></Link> */}
        <CustomButton
            to="/result-screen"
            width="450px"
            height="75px"
            fontSize="40px"
            padding="1.5rem"
            buttonColor="#F6F9F4" // ボタンの背景色
            textColor="#7648ec" // 文字の色
            iconSize="30px" // アイコンのサイズ
          >
            診断結果は～？　
          </CustomButton>
      </Flex>
    </main>
  );
}