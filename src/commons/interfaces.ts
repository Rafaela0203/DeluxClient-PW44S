
export interface IUserSignup {
    displayName: string;
    username: string;
    password: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}

export interface ICategory{
    id?: number;
    name: string;
}

export interface IProductInfo {
    id?: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    details: string;
    quantity: number;
    ingredients: string;
    image: string;
    category: ICategory;
}

export interface ICartItem {
    id?: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    details: string;
    quantity: number;
    ingredients: string;
    image: string;
    category: ICategory;
}

export interface IProduct {
    id?: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    image: string;
}

export interface IOrder {
    id?: number;
    user: IUser;
    address: IAddress;
    orderDate: string;
    payment: string;
    shipping: number;
}

export interface IAddress {
    id?: number;
    zip: string;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    user: IUser;
}