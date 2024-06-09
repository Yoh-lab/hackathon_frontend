"use client";

import { Flex, Box } from "@chakra-ui/react";
import { ShowPose } from "../../components/showPose";
import styles from '../../styles/Home.module.css';
import { Text } from '@chakra-ui/react'

import React from 'react';
import CustomButton from '../../components/customButton';
import Example from "../../components/stepper";
import { useCurrentPoseName } from "../contexts/currentPoseNameContext";

export default function Home() {
  const { currentPoseName } = useCurrentPoseName();

  return (
    <main className={styles.background}>
      <Box height="100%">
        <Box height="20%">
          <Example activeIndex={2} />
        </Box>
        <Flex direction="column" align="center" justify="center" minH="80vh" gap={10}>
          <ShowPose />
          <Text fontSize="4xl">{currentPoseName}</Text>
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
