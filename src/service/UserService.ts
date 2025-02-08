import { api } from "@/lib/axios.ts";
import { IUser } from "@/commons/interfaces.ts";

const USERS_URL = "/users";

const getProfile = async (): Promise<any> => {
    try {
        return await api.get(`${USERS_URL}/profile`);
    } catch (error: any) {
        return error.response;
    }
};

const updateUser = async (user: IUser): Promise<any> => {
    try {
        return await api.put(`${USERS_URL}/profile`, user);
    } catch (error: any) {
        return error.response;
    }
};

const UserService = {
    getProfile,
    updateUser,
};

export default UserService;
