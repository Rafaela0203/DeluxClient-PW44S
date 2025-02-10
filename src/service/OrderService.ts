import { api } from "@/lib/axios.ts";
import { IOrder } from "@/commons/interfaces.ts";

const ORDERS_URL = "/orders";

// Buscar todos os pedidos
const getOrders = async (): Promise<any> => {
    try {
        const response = await api.get(ORDERS_URL);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// Buscar um pedido pelo ID
const getOrderById = async (id: number): Promise<any> => {
    try {
        const response = await api.get(`${ORDERS_URL}/${id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// Criar um novo pedido
const createOrder = async (order: IOrder): Promise<any> => {
    try {
        const response = await api.post(ORDERS_URL, order);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// Exportando apenas as funções de pedido
const OrderService = {
    getOrders,
    getOrderById,
    createOrder,
};

export default OrderService;
