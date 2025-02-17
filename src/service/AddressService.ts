import { api } from "@/lib/axios.ts";
import { IAddress } from "@/commons/interfaces.ts";

const ADDRESS_URL = "/addresses";

// Buscar todos os endereços
const findAll = async (): Promise<any> => {
    let response;
    try {
        response = await api.get(ADDRESS_URL);
    } catch (error: any) {
        console.error("Erro ao buscar endereços:", error);
        response = error.response; // Retorna undefined em caso de erro
    }
    return response; // Retorna a lista de endereços

};

// Salvar um novo endereço
const save = async (address: IAddress): Promise<Response | undefined> => {
    let response
    try {
        response = await api.post(ADDRESS_URL, address);
    }catch (error: any){
        response = error.response;
    }
    return response;
};


const findById = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.get(`${ADDRESS_URL}/${id}`);
    }catch (error: any) {
        response = error.response;
    }
    return response;
}


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

const calculateShipment = async (data: any): Promise<any> => {
    try {
        const response = await fetch("/melhorenvio/me/shipment/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDQ2ZjI5MmM5MTBlMzBiNzRlNWYxZmRiMmZkODUxZjEyNjc5Mzk3MGIwZjQ1OGUxYzk0MTI1MGNmNmExYzMzNzE1MDJmYWQzYmFhYzhlYmYiLCJpYXQiOjE3Mzk2NzEyMTcuNjAxMTc5LCJuYmYiOjE3Mzk2NzEyMTcuNjAxMTgxLCJleHAiOjE3NzEyMDcyMTcuNTg4NzM5LCJzdWIiOiI5ZTMyNWVjZi0wM2U1LTRkZmItODkzNC1lMTFlN2ZjMDY1NTMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.xI_N2nG-9CGD9RaFAuZv2OCN51FAvHB8iv5Q7-NsdDm-te1pCXNnDfybM7IiLeQJ9To9d8QgW8iahcXnQ8ZFUjbtRstVcJm_p8R7lUhHtaDdEvR9yhSLmybCOaxWVb_4mrKwraGcQ8cceStdKVRtjSLXkd2m-4h4zYkXO4_Vxqu5Ajk1f3eYE4Muk85eRXbdpujzES8hsGD4NCW6R8Y52p4MV7nncwfj0CXPpurlYPdfb5qhASX7xhP9BKFmF8PyWMy3MvQOSrLQTf4ga6ELACERnNNqGFwa_zvbWrZDWeqVuCOiZRIcoilfvZALET1LzYeeGq5k3E4WKAv0c2tB7uLVgBZDepP7RNI3oF_2JRkuZ6YR9_ayPLdmp9_vtZeqQAGSVJ6JbpC2fgdeVUIq8cIHL4CBH9VtEoaBq0bN4g_vQ99DQnRv3kJ3zY51JfEP3rZ8ZNnQg3nmZXGOSlto3Wtai-Ze2omAUofvC0jIAwZ2iiYiB8zC5D6BHT1THX-t-Ra4XDLvLIluPl3HQ9LmJVo8wlwABhM_prCsuV_VaBaWrAJb6qpxl5V6mb0ppTvyX4abJrxzlE0wkB8ZXUH_P3YRZ7Ilv9SnehtjSRR2N0Xn_u5hL-nuD1ZgFyzQOuAj5e0Vf9nPlBr7_XyAHIRGPGEKckRFhB7dbd899muYfcE", // Replace with your token
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error calculating shipment:", error);
        return null;
    }
};

// Exportando o serviço com as funções disponíveis
const AddressService = {
    findAll,
    getAddressByCEP,
    save,
    findById,
    remove,
    calculateShipment,

};

export default AddressService;
