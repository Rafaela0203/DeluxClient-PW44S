import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";
import { useState } from "react";

interface QuantityInputProps {
    initialValue: number;
    onQuantityChange: (newQuantity: number) => void;
}

export function QuantityInput({ initialValue, onQuantityChange }: QuantityInputProps) {
    const [value, setValue] = useState<number>(initialValue);

    const handleChange = (valueString: string) => {
        const newValue = Number(valueString);
        setValue(newValue);
        onQuantityChange(newValue);
    };

    return (
        <NumberInput value={value}
                     onChange={handleChange}
                     min={1}
                     defaultValue={1}
                     maxW={20}>
            <NumberInputField/>
            <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
            </NumberInputStepper>
        </NumberInput>
    );
}
