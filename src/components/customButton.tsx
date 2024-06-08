import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

interface CustomButtonProps {
  to: string;
  width: string;
  height: string;
  fontSize: string;
  padding: string;
  children: React.ReactNode;
  buttonColor?: string;
  textColor?: string;
  iconSize?: string;
}

export default function CustomButton({ to, width, height, fontSize, padding, children, buttonColor='teal', textColor='white', iconSize='1em' }: CustomButtonProps) {
  return (
    <Link href={to}>
      <Box width={width} height={height}>
        <Button
          backgroundColor={buttonColor}
          color={textColor}
          // colorScheme='teal'
          width='100%'
          height='100%'
          fontSize={fontSize}
          padding={padding}
          _hover={{ backgroundColor: '#f6f9f492' }} // Hover state
        >
          {children}
          <ArrowRightIcon boxSize={iconSize} ml="0.5rem" />
        </Button>
      </Box>
    </Link>
  );
};

