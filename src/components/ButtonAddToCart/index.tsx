import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useToast
} from "@chakra-ui/react";
import { IProduct } from "@/commons/interfaces.ts";
import React, {useState} from "react";

interface IButtonAddToCart {
    product: IProduct;
}

export function ButtonAddToCart({ product }: IButtonAddToCart) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);
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
            <Button variant="ghost" bg="red.600" onClick={() => addToCart(product)}>
                Add to cart
            </Button>

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
