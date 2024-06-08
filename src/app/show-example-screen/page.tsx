"use client";

import { Flex, Box } from "@chakra-ui/react";
import { ShowPose } from "../../components/showPose";
import styles from '../../styles/Home.module.css';

import React from 'react';
import CustomButton from '../../components/customButton';
import Example from "../../components/stepper";

export default function Home() {
  return (
    <main className={styles.background}>
      <Box height="100%">
        <Box height="20%">
          <Example activeIndex={2} />
        </Box>
        <Flex direction="column" align="center" justify="center" minH="80vh" gap={20}>
          <div style={{width: '60%', height: 'auto',}}>
            <ShowPose />
          </div>
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
      </Box>
    </main>
  );
}
