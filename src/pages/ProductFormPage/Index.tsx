import {ICategory, IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import ProductService from "@/service/ProductService.ts";
import CategoryService from "@/service/CategoryService.ts";

export function ProductFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IProduct>();

    const [apiError, serApiError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        serApiError(false);
        const responseCategories = await CategoryService.findAll();
        if(responseCategories.status === 200){
            setCategories(responseCategories.data);
        }else {
            serApiError(true)
        }
        if(id){
            const response = await ProductService.findById(parseInt(id));
            if(response.status === 200){
                reset(response.data);
            }else{
                serApiError(true);
            }
        }
    }

    const onSubmit = async (data: IProduct) => {
        serApiError(false);

        const response = await ProductService.save(data);
        if(response.status === 201 || response.status === 200) {
            reset();
            navigate("/products");
        }else{
            serApiError(true);
        }
    }
    return (
        <>
            <main className="container row justify-content-center">
                <form className="form-floating col-md-6"
                      onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center mb-3">
                        <span className="h3 fw-normal">Cadastro de produto</span>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            className={"form-control" + (errors.name ? " is-invalid" : "")}
                            placeholder="Infome o nome"
                            type="text"
                            {...register("name", {
                                required: "O campo nome é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "O campo nome deve ter no mínimo 2 caracteres.",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "O campo nome deve ter no máximo 100 caracteres.",
                                },
                            })}
                        />
                        <label htmlFor="name">Nome</label>
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className="form-floating mb-3">
                        <textarea
                            className={"form-control" + (errors.description ? " is-invalid" : "")}
                            placeholder="Infome a descrição"
                            rows={5}
                            {...register("description", {
                                required: "O campo descrição é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "O campo nome deve ter no mínimo 2 caracteres.",
                                },
                                maxLength: {
                                    value: 254,
                                    message: "O campo nome deve ter no máximo 254 caracteres.",
                                },
                            })}
                        />
                        <label htmlFor="description">Descrição</label>
                        {errors.description && (
                            <div className="invalid-feedback">
                                {errors.description.message}
                            </div>
                        )}
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            className={"form-control" + (errors.price ? " is-invalid" : "")}
                            placeholder="Infome o preço"
                            type="text"
                            {...register("price", {
                                required: "O campo preço é obrigatório",
                            })}
                        />
                        <label htmlFor="price">Preço</label>
                        {errors.price && (
                            <div className="invalid-feedback">
                                {errors.price.message}
                            </div>
                        )}

                    </div>

                    <div className="form-floating mb-3">
                        <select
                            className={"form-control" + (errors.category ? " is-invalid" : "")
                        }
                        {...register("category.id", {
                            required: "O campo categoria é obrigatório.",
                        })}>
                        <option value="">
                            Selecione uma categoria
                        </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {apiError && (
                        <div className="alert alert-danger" role="alert">
                            Erro ao salvar a categoria.
                        </div>
                    )}

                    <button className="w-100 btn btn-lg btn-primary mb-3"
                            disabled={isSubmitting ? true : false}>
                        Salvar
                    </button>
                </form>
            </main>
        </>
    )
}