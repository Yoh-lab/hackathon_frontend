"use client";

import { Flex, Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link';
import { WebCam_Window } from "../../components/webcam";

export default function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" gap={20}>
      <WebCam_Window />
      <Link href="/result-screen"><Button colorScheme='teal' size='md'>診断結果！</Button></Link>
    </Flex>
  );
}