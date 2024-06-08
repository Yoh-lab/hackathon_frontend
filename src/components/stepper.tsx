import React from 'react';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Text,
} from '@chakra-ui/react'

interface StepperProps {
  activeIndex: number;
}

const steps = [
  { title: 'First', description: 'Home' },
  { title: 'Second', description: 'Roulette' },
  { title: 'Third', description: 'Pose' },
  { title: 'Fourth', description: 'Video' },
  { title: 'Fifth', description: 'Result' },
]

function Example({ activeIndex }: StepperProps) {
  const { activeStep } = useSteps({
    index: activeIndex,
    count: steps.length,
  })

  return (
    <Stepper size='lg' colorScheme='pink' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator color='#F6F9F4'>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle ><Text textColor="#F6F9F4">{step.title}</Text></StepTitle>
            <StepDescription><Text textColor="#d0d0cf">{step.description}</Text></StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}


// render(<Example />)
export default Example;
