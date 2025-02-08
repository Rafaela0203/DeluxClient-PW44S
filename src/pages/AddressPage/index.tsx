import { ChangeEvent, useState } from "react";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { useNavigate } from "react-router-dom";
import { IAddress } from "@/commons/interfaces.ts";
import AddressService from "@/service/AddressService";

export function AddressPage() {
    const [form, setForm] = useState<IAddress>({
        zip: "",
        street: "",
        number: null,
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "Brasil",
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [cepError, setCepError] = useState("");
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const onBlurCEP = async () => {
        if (form.zip.length === 8) {
            const addressData = await AddressService.getAddressByCEP(form.zip);
            if (addressData) {
                setForm((prevForm) => ({
                    ...prevForm,
                    street: addressData.logradouro,
                    neighborhood: addressData.bairro,
                    city: addressData.localidade,
                    state: addressData.uf,
                }));
                setCepError("");
            } else {
                setCepError("CEP inválido ou não encontrado.");
            }
        } else {
            setCepError("Digite um CEP válido com 8 dígitos.");
        }
    };

    const onClickSave = async () => {
        setPendingApiCall(true);
        setApiError(false);

        const response = await AddressService.save(form);

        if (response && (response.status === 200 || response.status === 201)) {
            setApiSuccess(true);
            setTimeout(() => navigate("/profile"), 2000);
        } else {
            setPendingApiCall(false);
            setApiError(true);
        }
    };

    return (
        <main className="form-address w-100 m-auto">
            <form>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Cadastro de Endereço</h1>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CEP"
                        name="zip"
                        value={form.zip}
                        onChange={onChange}
                        onBlur={onBlurCEP}
                    />
                    <label htmlFor="zip">CEP</label>
                    {cepError && <div className="invalid-feedback">{cepError}</div>}
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rua"
                        name="street"
                        value={form.street}
                        onChange={onChange} />
                    <label htmlFor="street">Rua</label>
                </div>
                <div className="form-floating">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Número"
                        name="number"
                        value={form.number}
                        onChange={onChange} />
                    <label htmlFor="number">Número</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Complemento"
                        name="complement"
                        value={form.complement}
                        onChange={onChange} />
                    <label htmlFor="complement">Complemento</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Bairro"
                        name="neighborhood"
                        value={form.neighborhood}
                        onChange={onChange} />
                    <label htmlFor="neighborhood">Bairro</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cidade"
                        name="city"
                        value={form.city}
                        onChange={onChange} />
                    <label htmlFor="city">Cidade</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Estado"
                        name="state"
                        value={form.state}
                        onChange={onChange} />
                    <label htmlFor="state">Estado</label>
                </div>
                {apiError && <div className="alert alert-danger">Falha ao salvar o endereço!</div>}
                {apiSuccess && <div className="alert alert-success">Endereço salvo com sucesso!</div>}
                <div className="text-center">
                    <ButtonWithProgress disabled={pendingApiCall} pendingApiCall={pendingApiCall} className="w-100 btn btn-lg btn-primary mb-3" text="Salvar" onClick={onClickSave} />
                </div>
            </form>
        </main>
    );
}
