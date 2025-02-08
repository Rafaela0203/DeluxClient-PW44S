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
    AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter
} from '@chakra-ui/react';
import {IProduct} from "@/commons/interfaces.ts";
import {ButtonAddToCart} from "@/components/ButtonAddToCart";
import React, {useState} from "react";

export function Cards({product}: { product: IProduct }) {
    const [apiError, setApiError] = useState<String>("");

    const addToCart = (product: IProduct) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const selectedProduct = cart.find(item => item.id === product.id);
        if(selectedProduct) {
            setApiError("Falha ao carregar lista de categorias.");
        }else{
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            setApiError("");
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
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </>
    );
}