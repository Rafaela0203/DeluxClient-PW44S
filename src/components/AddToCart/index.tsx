import { useState, useRef } from "react";
import { useToast, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import { IProduct } from "@/commons/interfaces.ts";

export function AddToCart() {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    const toast = useToast();

    const addToCart = (product: IProduct) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const selectedProduct = cart.find((item: IProduct) => item.id === product.id);
        if (selectedProduct) {
            setIsOpen(true);
            return;
        } else {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            toast({
                title: "Produto adicionado",
                description: "O produto foi adicionado ao carrinho.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    return {
        addToCart,
        alertDialog: (
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
        ),
    };
}
