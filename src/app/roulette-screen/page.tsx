"use client";


import { Flex } from "@chakra-ui/react";
import styles from '../../styles/Home.module.css';

import React from 'react';

import { Roulette } from "../../components/roulette";


export default function Home() {
  return (
    <main className={styles.background}>
      <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
        <Roulette />
      </Flex>
    </main>
  );
}
