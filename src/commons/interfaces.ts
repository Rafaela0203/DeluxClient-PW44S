export interface IUserSignup {
    email: string;
    name: string;
    password: string;
    passwordRepeat: string;
    cpf: string;
    birthDate: string;
    gender: string;
    phone: string;
}

export interface IUserLogin {
    email: string;
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
    category: ICategory;
}

export interface IOrder {
    id?: number;
    addressId: number;
    orderDate: string;
    payment: string;
    shipping: number;
    itemsList: {product: {id: number}, quantity: number}[];
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
}