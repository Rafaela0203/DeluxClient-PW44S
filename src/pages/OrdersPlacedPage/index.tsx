// import { ChangeEvent, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { IOrder } from "@/commons/interfaces.ts";
// import OrderService from "@/service/OrderService";
//
// export function OrdersPlacedPage() {
//     const [orders, setOrders] = useState<IOrder[]>([]);
//     const [apiError, setApiError] = useState(false);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         loadOrders();
//     }, []);
//
//     const loadOrders = async () => {
//         setApiError(false);
//         const response = await OrderService.getOrders();
//         if (response.status === 200) {
//             setOrders(response.data);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     return (
//         <main className="container">
//             <h1 className="h3 mb-3 fw-normal text-center">Pedidos Realizados</h1>
//             {orders.length === 0 ? (
//                 <div className="alert alert-info text-center">Nenhum pedido foi realizado ainda.</div>
//             ) : (
//                 <table className="table table-striped">
//                     <thead>
//                     <tr>
//                         <th>ID do Pedido</th>
//                         <th>Data</th>
//                         <th>Status</th>
//                         <th>Total</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {orders.map((order) => (
//                         <tr key={order.id}>
//                             <td>{order.id}</td>
//                             <td>{new Date(order.date).toLocaleDateString()}</td>
//                             <td>{order.status}</td>
//                             <td>R$ {order.total.toFixed(2)}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//             {apiError && <div className="alert alert-danger">Erro ao carregar pedidos!</div>}
//         </main>
//     );
// }
