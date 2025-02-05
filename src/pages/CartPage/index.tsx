// import { ChangeEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ICartItem } from "@/commons/interfaces.ts";
// import CartService from "@/service/CartService";
//
// export function CartPage() {
//     const [cartItems, setCartItems] = useState<ICartItem[]>([]);
//     const [apiError, setApiError] = useState(false);
//     const [apiSuccess, setApiSuccess] = useState(false);
//     const navigate = useNavigate();
//
//     const loadCart = async () => {
//         setApiError(false);
//         const response = await CartService.getCart();
//         if (response.status === 200) {
//             setCartItems(response.data);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     const onClickRemove = async (id: number) => {
//         const response = await CartService.removeItem(id);
//         if (response.status === 204) {
//             setCartItems(cartItems.filter((item) => item.id !== id));
//             setApiSuccess(true);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     const onClickCheckout = () => {
//         navigate("/checkout");
//     };
//
//     return (
//         <main className="container">
//             <h1 className="h3 mb-3 fw-normal text-center">Carrinho de Compras</h1>
//             {cartItems.length === 0 ? (
//                 <div className="alert alert-info text-center">Seu carrinho está vazio.</div>
//             ) : (
//                 <table className="table table-striped">
//                     <thead>
//                     <tr>
//                         <th>Produto</th>
//                         <th>Quantidade</th>
//                         <th>Preço</th>
//                         <th>Remover</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {cartItems.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.product.name}</td>
//                             <td>{item.quantity}</td>
//                             <td>R$ {item.product.price.toFixed(2)}</td>
//                             <td>
//                                 <button className="btn btn-danger" onClick={() => onClickRemove(item.id)}>
//                                     Remover
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//             {apiError && <div className="alert alert-danger">Erro ao carregar o carrinho!</div>}
//             {apiSuccess && <div className="alert alert-success">Item removido com sucesso!</div>}
//             <div className="text-center">
//                 <button className="btn btn-primary btn-lg" onClick={onClickCheckout} disabled={cartItems.length === 0}>
//                     Finalizar Compra
//                 </button>
//             </div>
//         </main>
//     );
// }
