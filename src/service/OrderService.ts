import { api } from "@/lib/axios.ts";
import { IOrder } from "@/commons/interfaces.ts";

const ORDERS_URL = "/orders";

// Buscar todos os pedidos
const findAll = async (): Promise<any> => {
    try {
        const response = await api.get(ORDERS_URL);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar pedidos:", error);
        return [];
    }
};

// Buscar um pedido pelo ID
const findById = async (id: number): Promise<any> => {
    try {
        const response = await api.get(`${ORDERS_URL}/${id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

// Criar um novo pedido
const save = async (order: IOrder): Promise<any> => {
    try {
        const response = await api.post(ORDERS_URL, order);
        return response;

    } catch (error: any) {
        return error.response;
    }
};

// Exportando apenas as funções de pedido
const OrderService = {
    findAll,
    findById,
    save,
};

export default OrderService;
