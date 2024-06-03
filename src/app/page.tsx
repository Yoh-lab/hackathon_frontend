"use client";

import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1>酔っ払いメーター</h1>
        <Button colorScheme='teal' size='md'>ルーレットスタート！</Button>
      </div>
    </div>
  );
}
