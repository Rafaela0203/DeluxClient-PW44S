import React, { useEffect, useState } from "react";
import { IProduct } from "@/commons/interfaces";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Image,
    Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Box, IconButton, Center, Input
} from "@chakra-ui/react";
import { Steps } from "@/components/Stepper/Steps.tsx";
import { QuantityInput } from "@/components/QuantityInput";
import { FaTrashAlt } from "react-icons/fa";

export function CartPage() {
    const [data, setData] = useState<IProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [productToRemove, setProductToRemove] = useState<number | null>(null);
    const cancelRef = React.useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]").map((product: IProduct) => ({
            ...product,
            cartQuantity: product.cartQuantity || 1 // Garante que a quantidade no carrinho seja separada
        }));
        setData(cart);
    };

    const updateCart = (id: number, newQuantity: number) => {
        const updatedCart = data.map((product) =>
            product.id === id ? { ...product, cartQuantity: newQuantity } : product
        );
        setData(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const onClickConfirm = (id: number) => {
        setProductToRemove(id);
        setIsOpen(true);
    };

    const onClickRemove = () => {
        if (productToRemove !== null) {
            const updatedCart = data.filter((product) => product.id !== productToRemove);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setData(updatedCart);
        }
        setIsOpen(false);
        setProductToRemove(null);
    };

    // Cálculo do resumo do pedido
    const subtotal = data.reduce((acc, product) => acc + product.price * product.cartQuantity, 0);
    const shipping = subtotal > 0 ? 10.00 : 0; // Exemplo: frete fixo de R$ 10,00 se houver produtos
    const total = subtotal + shipping;

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <span className="h3 mb-3 fw-normal">Carrinho</span>
                </div>
                <Flex>
                    {/* Tabela de produtos */}
                    <Box flex='2' p={'4'}>
                        <Table variant="striped" colorScheme="gray">
                            <Thead>
                                <Tr>
                                    <Th>Produto</Th>
                                    <Th>Quantidade</Th>
                                    <Th>Preço</Th>
                                    <Th>Remover</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map((product) => (
                                    <Tr key={product.id}>
                                        <Td>
                                            <Flex>
                                                <Box>
                                                    <Image src={product.image} alt={product.name} boxSize="100px" />
                                                </Box>
                                                <Center p={4}>{product.name}</Center>
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <QuantityInput
                                                key={product.id}
                                                onQuantityChange={(newQuantity) => updateCart(product.id, newQuantity)}
                                                initialValue={product.cartQuantity || 1}
                                            />
                                        </Td>
                                        <Td>R${(product.price * product.cartQuantity).toFixed(2)}</Td>
                                        <Td>
                                            <IconButton
                                                aria-label='delete'
                                                icon={<FaTrashAlt />}
                                                colorScheme="red"
                                                onClick={() => onClickConfirm(product.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>

                    {/* Resumo do pedido */}
                    <Box flex='1' p={'4'} border="1px solid #E2E8F0" borderRadius="md">
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th colSpan={2} textAlign="center">Resumo do Pedido</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>
                                            <Input placeholder='Digite seu CEP' />
                                            <Button colorScheme='red'>Calcular</Button>
                                        </Td>

                                    </Tr>
                                    <Tr>
                                        <Td>Subtotal</Td>
                                        <Td isNumeric>R$ {subtotal.toFixed(2)}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Frete</Td>
                                        <Td isNumeric>R$ {shipping.toFixed(2)}</Td>
                                    </Tr>
                                    <Tr fontWeight="bold">
                                        <Td>Total</Td>
                                        <Td isNumeric>R$ {total.toFixed(2)}</Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td colSpan={2} textAlign="center">
                                            <Button colorScheme="green" width="full">
                                                Finalizar Compra
                                            </Button>
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Box>
                </Flex>

                {/* AlertDialog para confirmar remoção */}
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => setIsOpen(false)}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>Remover produto</AlertDialogHeader>
                            <AlertDialogBody>Deseja remover o produto do carrinho?</AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>Cancelar</Button>
                                <Button colorScheme="red" onClick={onClickRemove} ml={3}>Remover</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </>
    );
}
