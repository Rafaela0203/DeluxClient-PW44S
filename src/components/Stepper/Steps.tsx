import {
    Box,
    Stepper,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber, StepSeparator,
    StepStatus,
    StepTitle,
    useSteps
} from "@chakra-ui/react";

export function Steps() {
    const steps = [
        { title: 'First', description: 'Contact Info' },
        { title: 'Second', description: 'Date & Time' },
        { title: 'Third', description: 'Select Rooms' },
    ]

    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    return (
        <Stepper index={activeStep}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}