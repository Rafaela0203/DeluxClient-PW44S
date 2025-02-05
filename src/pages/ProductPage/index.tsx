// import { ChangeEvent, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { IOrder, IProduct } from "@/commons/interfaces.ts";
// import ProductService from "@/service/ProductService";
//
// export function ProductPage() {
//     const { id } = useParams();
//     const [product, setProduct] = useState<IProduct | null>(null);
//     const [apiError, setApiError] = useState(false);
//
//     useEffect(() => {
//         loadProduct();
//     }, [id]);
//
//     const loadProduct = async () => {
//         setApiError(false);
//         const response = await ProductService.getProductById(id);
//         if (response.status === 200) {
//             setProduct(response.data);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     return (
//         <main className="container">
//             {apiError && <div className="alert alert-danger">Erro ao carregar o produto!</div>}
//             {product ? (
//                 <div>
//                     <h1 className="h3 mb-3 fw-normal text-center">{product.name}</h1>
//                     <img src={product.image} alt={product.name} className="img-fluid" />
//                     <p>{product.description}</p>
//                     <h3>R$ {product.price.toFixed(2)}</h3>
//                     <button className="btn btn-primary">Adicionar ao Carrinho</button>
//                 </div>
//             ) : (
//                 <div className="alert alert-info text-center">Carregando...</div>
//             )}
//         </main>
//     );
// }
