// import { ChangeEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ICartItem } from "@/commons/interfaces.ts";
// import CartService from "@/service/CartService";
// import OrderService from "@/service/OrderService";
//
// export function CheckoutPage() {
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
//     const onClickConfirmOrder = async () => {
//         const response = await OrderService.createOrder(cartItems);
//         if (response.status === 201) {
//             setApiSuccess(true);
//             setTimeout(() => navigate("/orders"), 2000);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     return (
//         <main className="container">
//             <h1 className="h3 mb-3 fw-normal text-center">Finalizar Compra</h1>
//             {cartItems.length === 0 ? (
//                 <div className="alert alert-info text-center">Seu carrinho está vazio.</div>
//             ) : (
//                 <table className="table table-striped">
//                     <thead>
//                     <tr>
//                         <th>Produto</th>
//                         <th>Quantidade</th>
//                         <th>Preço</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {cartItems.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.product.name}</td>
//                             <td>{item.quantity}</td>
//                             <td>R$ {item.product.price.toFixed(2)}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//             {apiError && <div className="alert alert-danger">Erro ao processar o pedido!</div>}
//             {apiSuccess && <div className="alert alert-success">Pedido confirmado com sucesso!</div>}
//             <div className="text-center">
//                 <button className="btn btn-success btn-lg" onClick={onClickConfirmOrder} disabled={cartItems.length === 0}>
//                     Confirmar Pedido
//                 </button>
//             </div>
//         </main>
//     );
// }
