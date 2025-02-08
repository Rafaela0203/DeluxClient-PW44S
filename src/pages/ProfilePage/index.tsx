import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserSignup } from "@/commons/interfaces.ts";
import UserService from "@/service/UserService";

export function ProfilePage() {
    const [user, setUser] = useState<IUserSignup | null>(null);
    const [apiError, setApiError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        setApiError(false);
        setLoading(true);

        try {
            const response = await UserService.getProfile();

            console.log("Resposta da API:", response.data); // Log para verificar os dados

            if (response.status === 200 && response.data) {
                setUser(response.data);
            } else {
                setApiError(true);
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            setApiError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container">
            {loading && <div className="alert alert-info text-center">Carregando...</div>}
            {apiError && <div className="alert alert-danger">Erro ao carregar o perfil!</div>}

            {user && !loading && !apiError && (
                <div>
                    <h1 className="h3 mb-3 fw-normal text-center">Perfil</h1>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Telefone:</strong> {user.phone}</p>
                    <button className="btn btn-primary" onClick={() => navigate("/profile/edit")}>Editar Perfil</button>
                </div>
            )}
        </main>
    );
}
