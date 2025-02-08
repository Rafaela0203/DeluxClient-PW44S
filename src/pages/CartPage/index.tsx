import { useEffect, useState } from "react";
import { IProduct} from "@/commons/interfaces";
import {Image} from "@chakra-ui/react";
import {Steps} from "@/components/Stepper/Steps.tsx";

export function CartPage() {
    // variável de estado para armazenar a mensagem de erro da API
    const [data, setData] = useState<IProduct[]>([])
    const [apiError, setApiError] = useState<String>("");

    // hook do react para executar ações ao carregar o componente
    // carrega a lista de categorias
    useEffect(() => {
         loadData();
    }, []);



    const loadData = async () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        setData(cart);
    };
    // função para remover uma categoria
    const onClickRemove = async (id?: number) => {
        if (id) {
            const novoArrayProdutos = data.filter((product: IProduct) => {
                return product.id !== id;
            });
            localStorage.setItem('cart', JSON.stringify(novoArrayProdutos));
            loadData();
        }
    };

    return (
        <>
            <main className="container">
                <Steps />
                <div className="text-center">
                    <span className="h3 mb-3 fw-normal">Carrinho</span>
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
                    {data.map((product: IProduct) => (
                        <tr key={product.id}>
                            <td><Image
                                src={product.image}
                                alt={product.name}
                                boxSize={"100px"}
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
