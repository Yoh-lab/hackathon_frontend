"use client";


import { Flex, Box } from "@chakra-ui/react";
import styles from '../../styles/Home.module.css';

import React from 'react';

import { Roulette } from "../../components/roulette";
import Example from "../../components/stepper";


export default function Home() {
  return (
    <main className={styles.background}>
      <Box height="100%">
        <Box height="20%">
          <Example activeIndex={1} />
        </Box>
        <Flex direction="column" align="center" justify="center" minH="80vh" gap={20}>
          <Roulette />
        </Flex>
      </Box>
    </main>
  );
}
