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
    Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Box, IconButton, Center, Input, FormControl, FormLabel
} from "@chakra-ui/react";
import { QuantityInput } from "@/components/QuantityInput";
import { FaTrashAlt } from "react-icons/fa";
import {Link, NavLink, useNavigate} from "react-router-dom";
import AuthService from "@/service/AuthService.ts";

export function CartPage() {
    const [data, setData] = useState<IProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [productToRemove, setProductToRemove] = useState<number | null>(null);
    const [cep, setCep] = useState("");
    const [shipping, setShipping] = useState(0);
    const cancelRef = React.useRef();
    const navigate = useNavigate();


    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]").map((product: IProduct) => ({
            ...product,
            cartQuantity: product.cartQuantity || 1
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

    const calculateShipping = () => {
        if (cep.length === 8) {
            // const addressData = await AddressService.getAddressByCEP(cep.zip);
            // if (addressData) {}
            setShipping(15.00);
        } else {
            setShipping(0);
        }
    };

    const handleCheckout = () => {
        if (AuthService.isAuthenticated()) {
            navigate("/checkout");
        } else {
            localStorage.setItem("redirectAfterLogin", "/checkout");
            navigate("/login");
        }
    };

    const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

    const subtotal = data.reduce((acc, product) => acc + product.price * product.cartQuantity, 0);
    const total = subtotal + shipping;

    return (
        <>
            <main className="mt-3 container">
                <div className="p-4">
                    <span className="h3 mb-3 fw-bold">Meu Carrinho</span>
                </div>
                <Flex>
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
                                        <Td>R$ {formatPrice(product.price * product.cartQuantity)}</Td>
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
                    <Box flex='1' p={'4'} >
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th colSpan={2} textAlign="center">Resumo do Pedido</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Subtotal</Td>
                                        <Td isNumeric>R$ {formatPrice(subtotal)}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Frete</Td>
                                        <Td isNumeric>R$ {formatPrice(shipping)}</Td>
                                    </Tr>
                                    <Tr fontWeight="bold">
                                        <Td>Total</Td>
                                        <Td isNumeric>R$ {formatPrice(total)}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td colSpan={2}>
                                            <FormControl>
                                                <FormLabel>Calcular Frete</FormLabel>
                                                <Flex>
                                                    <Input
                                                        placeholder="Digite seu CEP"
                                                        value={cep}
                                                        onChange={(e) => setCep(e.target.value)}
                                                    />
                                                    <Button ml={2} color="white" bg="red.600" onClick={calculateShipping}>Calcular</Button>
                                                </Flex>
                                            </FormControl>
                                        </Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Td colSpan={2} textAlign="center">
                                            <Button color="white" bg="red.600" width="full" onClick={handleCheckout}>
                                                Finalizar Compra
                                            </Button>
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        <Box p={'4'} align={'center'}>
                            <NavLink to="/">
                                <Button width="200px" colorScheme='red.600' variant='outline'>
                                    Continuar comprando
                                </Button>
                            </NavLink>
                        </Box>
                    </Box>
                </Flex>
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