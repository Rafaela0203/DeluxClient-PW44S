import {api} from "@/lib/axios.ts";
import { IProduct} from "@/commons/interfaces.ts";

const PRODUCT_URL = "/products";

const findAll = async (): Promise<any> => {
    let response;

    try{
        response = await api.get(PRODUCT_URL);
    }catch (error: any){
        response = error.response;
    }
    return response;
};

const remove = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.delete(`${PRODUCT_URL}/${id}`);
    }catch (error: any){
        response = error.response;
    }
    return response;
}

const save = async (product : IProduct): Promise<any> => {
    let response;
    try {
        response = await api.post(PRODUCT_URL, product);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const findById = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.get(`${PRODUCT_URL}/${id}`);
    }catch (error: any) {
        response = error.response;
    }
    return response;
}

const findByCategory = async (categoryId: number): Promise<any> => {
    let response;
    try {
        response = await api.get(`${PRODUCT_URL}/category/${categoryId}`);
    }catch (error: any) {
        response = error.response;
    }
    return response;
}

const findByName = async (name: string): Promise<IProduct[]> => {
    try {
        const response = await api.get(`/products?search=${encodeURIComponent(name)}`);
        return response.data; // Retorna apenas os dados
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return []; // Retorna um array vazio em caso de erro
    }
};

const ProductService = {
    findAll,
    remove,
    save,
    findById,
    findByCategory,
    findByName,
};

export default ProductService;