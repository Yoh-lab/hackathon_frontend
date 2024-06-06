"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <Text fontSize='4xl'>酔っ払いメーター</Text>
      <Link href="/roulette-screen"><Button colorScheme='teal' size='md'>診断開始！</Button></Link>
    </Flex>
  );
}
