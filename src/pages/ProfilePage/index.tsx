import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserSignup, IAddress, IOrder } from "@/commons/interfaces.ts";
import UserService from "@/service/UserService";
import AddressService from "@/service/AddressService";
import OrderService from "@/service/OrderService";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Text, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa"; // Ícone de lixeira para excluir

export function ProfilePage() {
    const [user, setUser] = useState<IUserSignup | null>(null);
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [apiError, setApiError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
        loadAddresses();
        loadOrders();
    }, []);

    const loadUser = async () => {
        setApiError(false);
        setLoading(true);

        try {
            const response = await UserService.getProfile();
            console.log("Resposta da API:", response.data);

            if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
                setUser(response.data[0]); // Pega o primeiro usuário do array
            } else {
                setApiError(true);
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

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

    const loadOrders = async () => {
        try {
            const response = await OrderService.getOrders();
            if (response) {
                setOrders(response);
            }
        } catch (error) {
            console.error("Erro ao carregar pedidos:", error);
        }
    };

    const onClickRemoveAddress = async (id?: number) => {
        if (id) {
            try {
                await AddressService.remove(id); // Remove do backend
                const novoArrayEnderecos = addresses.filter((address: IAddress) => address.id !== id);
                setAddresses(novoArrayEnderecos); // Atualiza o estado local
            } catch (error) {
                console.error("Erro ao remover endereço:", error);
            }
        }
    };


    return (
        <Box className="container" p={4}>
            {loading && <Text className="alert alert-info text-center">Carregando...</Text>}
            {apiError && <Text className="alert alert-danger">Erro ao carregar o perfil!</Text>}

            {!loading && !apiError && user && (
                <Tabs isFitted variant="enclosed">
                    <TabList mb="1em">
                        <Tab>Perfil</Tab>
                        <Tab>Endereços</Tab>
                        <Tab>Meus Pedidos</Tab>
                    </TabList>

                    <TabPanels>
                        {/* Painel do Perfil - Restaurado para versão anterior */}
                        <TabPanel>
                            <Box>
                                <h1 className="h3 mb-3 fw-normal text-center">Perfil</h1>
                                <p><strong>Nome:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Telefone:</strong> {user.phone}</p>
                                <p><strong>Data de nascimento:</strong> {user.birthDate}</p>
                                <p><strong>Gênero:</strong> {user.gender}</p>
                                <button className="btn btn-primary" onClick={() => navigate("/profile/edit")}>Editar Perfil</button>
                            </Box>
                        </TabPanel>

                        {/* Painel de Endereços - Agora com botão de excluir */}<TabPanel>
                        <Box>
                            <Text fontSize="lg" fontWeight="bold">Meus Endereços</Text>
                            {addresses.length > 0 ? (
                                addresses.map((address) => (
                                    <Box key={address.id} borderWidth="1px" borderRadius="lg" p={4} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Text><strong>Rua:</strong> {address.street}, {address.number}</Text>
                                            <Text><strong>Bairro:</strong> {address.neighborhood}</Text>
                                            <Text><strong>Cidade:</strong> {address.city} - {address.state}</Text>
                                            <Text><strong>CEP:</strong> {address.zip}</Text>
                                        </Box>
                                        <IconButton
                                            aria-label="Excluir Endereço"
                                            icon={<FaTrash />}
                                            colorScheme="red"
                                            onClick={() => onClickRemoveAddress(address.id)}
                                        />
                                    </Box>
                                ))
                            ) : (
                                <Text className="alert alert-warning">Nenhum endereço cadastrado.</Text>
                            )}
                            <Button colorScheme="red" mt={3} onClick={() => navigate("/address")}>
                                Adicionar Endereço
                            </Button>
                        </Box>
                    </TabPanel>


                        {/* Painel de Meus Pedidos - Mantido com as melhorias */}
                        <TabPanel>
                            <Box>
                                <Text fontSize="lg" fontWeight="bold">Meus Pedidos</Text>
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <Box key={order.id} borderWidth="1px" borderRadius="lg" p={4} mt={2}>
                                            <Text><strong>Pedido #:</strong> {order.id}</Text>
                                            <Text><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</Text>
                                            <Text><strong>Status:</strong> {order.status}</Text>
                                        </Box>
                                    ))
                                ) : (
                                    <Text className="alert alert-warning">Nenhum pedido encontrado.</Text>
                                )}
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
        </Box>
    );
}
