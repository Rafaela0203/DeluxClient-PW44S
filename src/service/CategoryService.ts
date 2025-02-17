import { api } from "@/lib/axios.ts";
import { ICategory } from "@/commons/interfaces.ts";

const CATEGORY_URL = "/categories";

const findAll = async (): Promise<any> => {
    try {
        const response = await api.get(CATEGORY_URL);
        return response;
    } catch (error: any) {
        console.error("Erro ao buscar categorias:", error);
        return { status: 500, data: [] }; // Retorna um array vazio em caso de erro
    }
};

const findById = async (id: number): Promise<ICategory | null> => {
    try {
        const response = await api.get<ICategory>(`${CATEGORY_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar categoria com ID ${id}:`, error);
        return null; // Retorna null caso ocorra um erro
    }
};

const save = async (category: ICategory): Promise<boolean> => {
    try {
        await api.post(CATEGORY_URL, category);
        return true; // Retorna sucesso
    } catch (error) {
        console.error("Erro ao salvar categoria:", error);
        return false; // Retorna falso caso falhe
    }
};

const remove = async (id: number): Promise<boolean> => {
    try {
        await api.delete(`${CATEGORY_URL}/${id}`);
        return true; // Retorna sucesso
    } catch (error) {
        console.error(`Erro ao remover categoria com ID ${id}:`, error);
        return false; // Retorna falso caso falhe
    }
};

const CategoryService = {
    findAll,
    findById,
    save,
    remove,
};

export default CategoryService;
