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
  Image,
} from '@chakra-ui/react'

interface StepperProps {
  activeIndex: number;
}

// const steps = [
//   { title: 'First', description: 'Home' },
//   { title: 'Second', description: 'Roulette' },
//   { title: 'Third', description: 'Pose' },
//   { title: 'Fourth', description: 'Video' },
//   { title: 'Fifth', description: 'Result' },
// ]
const steps = [
  { title: 'Home', description: '../../stepper_icon/home.svg' },
  { title: 'Roulette', description: '../../stepper_icon/roulette.svg' },
  { title: 'Pose', description: '../../stepper_icon/pose.svg' },
  { title: 'Video', description: '../../stepper_icon/video.svg' },
  { title: 'Result', description: '../../stepper_icon/result.svg' },
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
            {/* <StepDescription><Text textColor="#d0d0cf">{step.description}</Text></StepDescription> */}
            <StepDescription>
              <Image
                src={step.description}
                alt={step.title}
                boxSize="25px"
              />
            </StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}


// render(<Example />)
export default Example;
