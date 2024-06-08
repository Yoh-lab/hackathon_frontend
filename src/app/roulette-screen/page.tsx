"use client";

import { Flex, Box } from "@chakra-ui/react";


import { Roulette } from "../../components/roulette";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <Roulette />
    </Flex>
  );
}