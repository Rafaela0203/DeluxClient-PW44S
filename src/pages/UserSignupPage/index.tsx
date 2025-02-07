import { ChangeEvent, useState } from "react";
import "./index.css";
import { IUserSignup } from "@/commons/interfaces.ts";
import AuthService from "@/service/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Link, useNavigate } from "react-router-dom";

export function UserSignupPage() {
    const [form, setForm] = useState<IUserSignup>({
        email: "",
        name: "",
        password: "",
        cpf: "",
        birthDate: "",
        gender: "",
        phone: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: "",
        cpf: "",
        birthDate: "",
        gender: "",
        phone: "",
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
        setErrors((previousForm) => ({ ...previousForm, [name]: "" }));
    };

    const onClickSignup = async () => {
        setPendingApiCall(true);
        setApiError(false);
        const response = await AuthService.signup(form);

        if (response.status === 200 || response.status === 201) {
            setApiSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } else {
            if (response.data.validationErrors) {
                setErrors(response.data.validationErrors);
            }
            setApiError(true);
            setPendingApiCall(false);
        }
    };

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Novo Usuário</h1>
                </div>

                <div className="form-floating">
                    <input
                        type="email"
                        className={errors.email ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu email"
                        name="email"
                        onChange={onChange}
                        value={form.email}
                    />
                    <label>Email</label>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.name ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu nome"
                        name="name"
                        onChange={onChange}
                        value={form.name}
                    />
                    <label>Nome</label>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className={errors.password ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe a sua senha"
                        name="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label>Senha</label>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.cpf ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu CPF"
                        name="cpf"
                        onChange={onChange}
                        value={form.cpf}
                    />
                    <label>CPF</label>
                    {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="date"
                        className={errors.birthDate ? "form-control is-invalid" : "form-control"}
                        name="birthDate"
                        onChange={onChange}
                        value={form.birthDate}
                    />
                    <label>Data de Nascimento</label>
                    {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.gender ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe seu gênero"
                        name="gender"
                        onChange={onChange}
                        value={form.gender}
                    />
                    <label>Gênero</label>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.phone ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu telefone"
                        name="phone"
                        onChange={onChange}
                        value={form.phone}
                    />
                    <label>Telefone</label>
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                {apiError && <div className="alert alert-danger">Falha ao cadastrar-se!</div>}
                {apiSuccess && <div className="alert alert-success">Cadastro realizado com sucesso!</div>}

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        className="w-100 btn btn-lg btn-primary mb-3"
                        text="Cadastrar"
                        onClick={onClickSignup}
                    />
                </div>
            </form>
            <div className="text-center">
                Já possui cadastro? <Link className="link-primary" to="/login">Login</Link>
            </div>
        </main>
    );
}
