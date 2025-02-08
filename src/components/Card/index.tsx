import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    Alert,
    AlertIcon,
    useDisclosure,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useToast
} from '@chakra-ui/react';
import {IProduct} from "@/commons/interfaces.ts";
import {ButtonAddToCart} from "@/components/ButtonAddToCart";
import React, {useState} from "react";

export function Cards({product}: { product: IProduct }) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();
    const toast = useToast();

    const addToCart = (product: IProduct) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const selectedProduct = cart.find(item => item.id === product.id);
        if(selectedProduct) {
            setIsOpen(true);
            return;
        }else{
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            toast({
                title: "Produto adicionado",
                description: "O produto foi adicionado ao carrinho.",
                status: "success",
                duration: 3000, // Tempo que a mensagem fica visível (em ms)
                isClosable: true, // Permite fechar manualmente
                position: "top-right", // Posição na tela
            })
            return;
        }

    };



    return (
        <>
            <Card maxW='sm' >
                <CardBody>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md' color={"red.600"}>{product.brand}</Heading>
                        <Text>
                            {product.description} {/* Aqui você pode usar a descrição do produto */}
                        </Text>
                        <Text color='red.600' fontSize='2xl'>
                            R${(product.price).toFixed(2)}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonAddToCart product={product} onClick={addToCart} />;
                </CardFooter>
            </Card>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Produto já no carrinho</AlertDialogHeader>
                        <AlertDialogBody>Esse produto já foi adicionado ao carrinho.</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>
    );
}