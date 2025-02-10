import React, { useEffect, useState } from "react";
import { IProduct} from "@/commons/interfaces";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button,
    Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper
} from "@chakra-ui/react";
import {Steps} from "@/components/Stepper/Steps.tsx";

export function CartPage() {
    // variável de estado para armazenar a mensagem de erro da API
    const [data, setData] = useState<IProduct[]>([])
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef();

    // hook do react para executar ações ao carregar o componente
    // carrega a lista de categorias
    useEffect(() => {
         loadData();
    }, []);



    const loadData = async () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        setData(cart);
    };
    // função para remover uma categoria
    const onClickRemove = async (id?: number) => {
        if (id) {
            const novoArrayProdutos = data.filter((product: IProduct) => {
                return product.id !== id;
            });
            localStorage.setItem('cart', JSON.stringify(novoArrayProdutos));
            setIsOpen(true);
            loadData();
        }
    };

    return (
        <>
            <main className="container">
                <Steps />
                <div className="text-center">
                    <span className="h3 mb-3 fw-normal">Carrinho</span>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((product: IProduct) => (
                        <tr key={product.id}>
                            <td><Image
                                src={product.image}
                                alt={product.name}
                                boxSize={"100px"}
                            /></td>
                            <td>{product.name}</td>
                            <td><NumberInput defaultValue={1} min={1} maxW={20}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput></td>
                            <td>R${(product.price).toFixed(2)}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickRemove(product.id)}
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>Produto já no carrinho</AlertDialogHeader>
                            <AlertDialogBody>Esse produto já foi adicionado ao carrinho.</AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={onClose}>
                                    OK
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </>
    );
}
