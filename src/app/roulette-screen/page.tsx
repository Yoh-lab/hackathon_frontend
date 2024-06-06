"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';

import { Roulette } from "../../components/roulette";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <Roulette />
      <Button colorScheme='teal' size='md'>ルーレットスタート！</Button>
      <Link href="/shooting-screen"><Button colorScheme='teal' size='md'>ポーズ例を見てみよう！</Button></Link>
    </Flex>
  );
}