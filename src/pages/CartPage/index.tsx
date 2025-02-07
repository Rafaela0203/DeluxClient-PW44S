import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct} from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import {Image} from "@chakra-ui/react";

export function CartPage() {
    // variável de estado para armazenar a lista de categorias
    const [data, setData] = useState<IProduct[]>([]);
    // variável de estado para armazenar a mensagem de erro da API
    const [apiError, setApiError] = useState<String>("");
    // funções do serviço de categoria
    const { findAll, remove } = ProductService;

    // hook do react para executar ações ao carregar o componente
    // carrega a lista de categorias
    useEffect(() => {
        //loadData();
    }, []);

    // função para carregar a lista de produtos
   const cart = JSON.parse(localStorage.getItem("cart") || "[]");


    // função para remover uma categoria
    const onClickRemove = async (id?: number) => {
        if (id) {
            cart.filter((product: IProduct) => {
                return product.id !== id;
            })
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    };

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <span className="h3 mb-3 fw-normal">Lista de Categorias</span>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((product: IProduct) => (
                        <tr key={product.id}>
                            <td><Image
                                src={product.image}
                                alt={product.name}
                                borderRadius='sm'
                            /></td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickRemove(product.id)}
                                >
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
            </main>
        </>
    );
}
