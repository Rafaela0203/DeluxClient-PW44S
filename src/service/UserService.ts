// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { IUser } from "@/commons/interfaces.ts";
// import { api } from "@/lib/axios.ts";
// import { IAddress, ICartItem, IOrder } from "@/commons/interfaces.ts";
//
// const ADDRESS_URL = "/addresses";
// const CART_URL = "/cart";
// const CHECKOUT_URL = "/checkout";
// const ORDERS_URL = "/orders";
// const USERS_URL = "/users";
//
// const findAllAddresses = async (): Promise<any> => {
//     try {
//         await api.get(ADDRESS_URL);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const removeAddress = async (id: number): Promise<any> => {
//     try {
//         await api.delete(`${ADDRESS_URL}/${id}`);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const saveAddress = async (address: IAddress): Promise<any> => {
//     try {
//         await api.post(ADDRESS_URL, address);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const findAddressById = async (id: number): Promise<any> => {
//     try {
//         await api.get(`${ADDRESS_URL}/${id}`);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const AddressService = {
//     findAll: findAllAddresses,
//     remove: removeAddress,
//     save: saveAddress,
//     findById: findAddressById,
// };
//
// export default AddressService;
//
// const getCart = async (): Promise<any> => {
//     try {
//         await api.get(CART_URL);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const addItem = async (item: ICartItem): Promise<any> => {
//     try {
//         await api.post(CART_URL, item);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const removeItem = async (id: number): Promise<any> => {
//     try {
//         await api.delete(`${CART_URL}/${id}`);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const CartService = {
//     getCart,
//     addItem,
//     removeItem,
// };
//
// export default CartService;
//
// const createOrder = async (order: IOrder): Promise<any> => {
//     try {
//         await api.post(CHECKOUT_URL, order);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const CheckoutService = {
//     createOrder,
// };
//
// export default CheckoutService;
//
// const getOrders = async (): Promise<any> => {
//     try {
//         await api.get(ORDERS_URL);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const getOrderById = async (id: number): Promise<any> => {
//     try {
//         await api.get(`${ORDERS_URL}/${id}`);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const OrderService = {
//     getOrders,
//     getOrderById,
// };
//
// export default OrderService;
//
// const getProfile = async (): Promise<any> => {
//     try {
//         await api.get(`${USERS_URL}/profile`);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const updateUser = async (user: IUser): Promise<any> => {
//     try {
//         await api.put(`${USERS_URL}/profile`, user);
//     } catch (error: any) {
//         error.response;
//     }
// };
//
// const UserService = {
//     getProfile,
//     updateUser,
// };
//
// export default UserService;