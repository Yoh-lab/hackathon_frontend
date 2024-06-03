"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <h1 className="text-center">酔っ払いメーター</h1>
      <Button colorScheme='teal' size='md'>ルーレットスタート！</Button>
    </Flex>
  );
}
