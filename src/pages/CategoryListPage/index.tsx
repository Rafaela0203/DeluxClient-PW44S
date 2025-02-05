import {ICategory} from "@/commons/interfaces.ts";
import React, {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService.ts";
import {Link} from "react-router-dom";

export function CategoryListPage() {
    const [data, setData] = React.useState<ICategory[]>([]);
    const [apiError, setApiError] = React.useState<boolean>(false);
    const [apiMessage, setApiMessage] = useState<String>("");
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);

    useEffect(() => {
        loadData();

    }, []);

    const loadData = async () => {
        setApiError(false);
        setApiMessage("")

        const response = await CategoryService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }else {
            setApiError(true);
            setApiMessage("Falha ao carregar os dados");
            setData([]);
        }
    }

    const onClickRemove = async (id?: number) => {
        setApiError(false);
        setApiMessage("");
        setApiSuccess(false);
        if(id){
            const response = await CategoryService.remove(id);
            if (response.status === 204) {
                setData(data.filter((category) => category.id !== id));
                setApiSuccess(true);
                setApiMessage("Categoria removida com sucesso");
            }else {
                setApiError(true);
                setApiMessage("Falha ao remover a categoria");
            }
        }
    }

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <span className="h3 mb-3 fw-normal">Category List Page</span>
                </div>
                <Link to="/categories/new"
                      className="btn btn-success mb-3">
                    Nova Categoria
                </Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Editar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link
                                    className="btn btn-primary"
                                    to={`/categories/${category.id}`}
                                >
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickRemove(category.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {apiError && (
                    <div className="alert alert-danger" role="alert">
                        {apiMessage}
                    </div>
                )}
                {apiSuccess && (
                    <div className="alert alert-success" role="alert">
                        {apiMessage}
                    </div>
                )}
            </main>

        </>
    )
}