import {ChangeEvent, useEffect, useState} from "react";
import { IUserLogin } from "@/commons/interfaces.ts";
import AuthService from "@/service/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectPath);
        }
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));
    };

    const onClickLogin = async () => {
        setPendingApiCall(true);
        setApiError(false);

        const response = await AuthService.login(form);
        if (response.status === 200) {
            setApiSuccess(true);
            setTimeout(() => {
                if (AuthService.isAuthenticated()) {
                            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                            localStorage.removeItem("redirectAfterLogin");
                            navigate(redirectPath);
                        }
            }, 2000);
        } else {
            setPendingApiCall(false);
            setApiError(true);
            console.log("Falha ao efetuar login!");
        }
    };

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                </div>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Informe o seu email"
                        name="email"
                        id="email"
                        onChange={onChange}
                        value={form.email}
                    />
                    <label htmlFor="email">Informe o seu email</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Informe a sua senha"
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label htmlFor="password">Informe a sua senha</label>
                </div>
                {apiError && <div className="alert alert-danger">Falha ao autenticar-se!</div>}
                {apiSuccess && <div className="alert alert-success">Usuário autenticado com sucesso!</div>}
                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        className="w-100 btn btn-lg mb-3"
                        text="Login"
                        onClick={onClickLogin}
                    />
                </div>
            </form>
            <div className="text-center">
                Ainda não possui cadastro?
                <Link className="link-primary" to="/signup"> Cadastrar-se</Link>
            </div>
        </main>
    );
}
