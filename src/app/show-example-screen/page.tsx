"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';
import { ShowPose } from "../../components/showPose";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <ShowPose />
      <Link href="/shooting-screen"><Button colorScheme='teal' size='md'>撮影開始！</Button></Link>
    </Flex>
  );
}