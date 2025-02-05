// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { IUser } from "@/commons/interfaces.ts";
// import UserService from "@/service/UserService";
// import { api } from "@/lib/axios.ts";
// import { IAddress } from "@/commons/interfaces.ts";
//
// const ADDRESS_URL = "/addresses";
//
// const findAll = async (): Promise<any> => {
//     let response;
//     try {
//         response = await api.get(ADDRESS_URL);
//     } catch (error: any) {
//         response = error.response;
//     }
//     return response;
// };
//
// const remove = async (id: number): Promise<any> => {
//     let response;
//     try {
//         response = await api.delete(`${ADDRESS_URL}/${id}`);
//     } catch (error: any) {
//         response = error.response;
//     }
//     return response;
// };
//
// const save = async (address: IAddress): Promise<any> => {
//     let response;
//     try {
//         response = await api.post(ADDRESS_URL, address);
//     } catch (error: any) {
//         response = error.response;
//     }
//     return response;
// };
//
// const findById = async (id: number): Promise<any> => {
//     let response;
//     try {
//         response = await api.get(`${ADDRESS_URL}/${id}`);
//     } catch (error: any) {
//         response = error.response;
//     }
//     return response;
// };
//
// const AddressService = {
//     findAll,
//     remove,
//     save,
//     findById,
// };
//
// export default AddressService;
//
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
