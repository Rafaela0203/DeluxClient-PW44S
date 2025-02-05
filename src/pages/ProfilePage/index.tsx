// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { IUser } from "@/commons/interfaces.ts";
// import UserService from "@/service/UserService";
//
// export function ProfilePage() {
//     const [user, setUser] = useState<IUser | null>(null);
//     const [apiError, setApiError] = useState(false);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         loadUser();
//     }, []);
//
//     const loadUser = async () => {
//         setApiError(false);
//         const response = await UserService.getProfile();
//         if (response.status === 200) {
//             setUser(response.data);
//         } else {
//             setApiError(true);
//         }
//     };
//
//     return (
//         <main className="container">
//             {apiError && <div className="alert alert-danger">Erro ao carregar o perfil!</div>}
//             {user ? (
//                 <div>
//                     <h1 className="h3 mb-3 fw-normal text-center">Perfil</h1>
//                     <p><strong>Nome:</strong> {user.name}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Telefone:</strong> {user.phone}</p>
//                     <button className="btn btn-primary" onClick={() => navigate("/profile/edit")}>Editar Perfil</button>
//                 </div>
//             ) : (
//                 <div className="alert alert-info text-center">Carregando...</div>
//             )}
//         </main>
//     );
// }
