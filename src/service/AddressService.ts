import { api } from "@/lib/axios.ts";
import { IAddress } from "@/commons/interfaces.ts";

const ADDRESS_URL = "/addresses";

// Buscar todos os endereços
const findAll = async (): Promise<IAddress[] | undefined> => {
    try {
        const response = await api.get(ADDRESS_URL);
        return response.data; // Retorna a lista de endereços
    } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        return undefined; // Retorna undefined em caso de erro
    }
};

// Salvar um novo endereço
const save = async (address: IAddress): Promise<Response | undefined> => {
    try {
        return await api.post(ADDRESS_URL, address);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erro ao salvar endereço:", error.message);
        }
        return undefined; // Retorna undefined se ocorrer erro
    }
};

// Remover um endereço pelo ID
const remove = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.delete(`${ADDRESS_URL}/${id}`);
    } catch (error: any) {
        response = error.response // Retorna false caso ocorra erro
    }
    return response;
};

// Buscar endereço pelo CEP usando ViaCEP
const getAddressByCEP = async (cep: string): Promise<any> => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            throw new Error("CEP não encontrado.");
        }

        return data; // Retorna os dados do endereço
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        return null; // Retorna null caso haja erro
    }
};

// Exportando o serviço com as funções disponíveis
const AddressService = {
    findAll,
    getAddressByCEP,
    save,
    remove,
};

export default AddressService;
