import { api } from "@/lib/axios.ts";
import { IAddress } from "@/commons/interfaces.ts";

const ADDRESS_URL = "/addresses";

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

const AddressService = {
    getAddressByCEP,
    save
};

export default AddressService;

// export function ProfilePage() {
//     const [user, setUser] = useState<IUser | null>(null);
//     const [apiError, setApiError] = useState(false);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         loadUser();
//     }, []);
//
//     const loadUser = async () => {
//         setApiError(false);
//         const response = await UserService.getProfile();
//         if (response.status === 200) {
//             setUser(response.data);
//         } else {
//             setApiError(true);
//         }
//     };
//
// }
