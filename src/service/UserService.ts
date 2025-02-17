import { api } from "@/lib/axios.ts";
import { IUserSignup } from "@/commons/interfaces.ts";

const USERS_URL = "/users";

const getProfile = async (): Promise<any> => {
    try {
        return await api.get(`${USERS_URL}`);
    } catch (error: any) {
        return error.response;
    }
};

const updateUser = async (user: IUserSignup): Promise<any> => {
    try {
        return await api.put(`${USERS_URL}`, user);
    } catch (error: any) {
        return error.response;
    }
};

const UserService = {
    getProfile,
    updateUser,
};

export default UserService;
