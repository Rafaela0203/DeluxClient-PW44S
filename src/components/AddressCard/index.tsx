import React from "react";
import { Box, Text, VStack, Flex, Icon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import {IAddress} from "@/commons/interfaces.ts";

interface AddressCardProps {
    address?: IAddress;
    selectedAddress: string;
    onSelect: (id: number) => void;
}

export function AddressCard({ address, selectedAddress, onSelect }: AddressCardProps) {
    if (!address) return null;

    const isSelected = selectedAddress === address.id.toString();

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            shadow="md"
            cursor="pointer"
            onClick={() => onSelect(address.id)}
            bg={isSelected ? "blue.100" : "white"}
            borderColor={isSelected ? "blue.500" : "gray.200"}
        >
            <VStack align="start" spacing={2}>
                <Flex align="center" justify="space-between" width="100%">
                    <Text fontWeight="bold">{address.street}, {address.number}</Text>
                    {isSelected && <Icon as={FaCheckCircle} color="blue.500" />}
                </Flex>
                <Text>{address.city} - {address.state}</Text>
                <Text>{address.zip}</Text>
            </VStack>
        </Box>
    );
}
