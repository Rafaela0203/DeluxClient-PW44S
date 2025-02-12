import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  AuthService  from "@/service/AuthService";
import  AddressService  from "@/service/AddressService";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Stack,
    Radio,
    Heading,
    VStack, HStack, useRadioGroup
} from "@chakra-ui/react";
import {RadioCard} from "@/components/RadioCard";

export function CheckoutPage() {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("credit_card");

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            navigate("/login");
            return;
        }
        loadAddresses();
    }, []);

    const loadAddresses = async () => {

        try {
            const response = await AddressService.findAll();
            if (response) {
                setAddresses(response);
            }
        } catch (error) {
            console.error("Erro ao carregar endereços:", error);
        }
    };

    const handleConfirmOrder = () => {
        console.log("Pedido confirmado com:", selectedAddress, paymentMethod);
        // Aqui você pode chamar um serviço para processar o pedido
    };

    const options = ['react', 'vue', 'svelte']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })

    const group = getRootProps()


    return (
        <Box p={6} maxW="600px" mx="auto">
            <Heading mb={4}>Finalizar Compra</Heading>

            <FormControl mb={4}>
                <FormLabel>Selecione um Endereço</FormLabel>
                <HStack {...group}>
                    {options.map((value) => {
                        const radio = getRadioProps({ value })
                        return (
                            <RadioCard key={value} {...radio}>
                                {value}
                            </RadioCard>
                        )
                    })}
                </HStack>
                <Button mt={2} colorScheme="blue" onClick={() => navigate("/address")}>Cadastrar Novo Endereço</Button>
            </FormControl>

            <FormControl mb={4}>
                <FormLabel>Forma de Pagamento</FormLabel>
                <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                    <Stack direction="column">
                        <Radio value="credit_card">Cartão de Crédito</Radio>
                        <Radio value="boleto">Boleto</Radio>
                        <Radio value="pix">Pix</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <VStack mt={6}>
                <Button colorScheme="green" onClick={handleConfirmOrder}>Confirmar Pedido</Button>
            </VStack>
        </Box>
    );
}
