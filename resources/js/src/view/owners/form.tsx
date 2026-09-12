import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { OwnerPayload } from "../../models/owners.types";
import ownersAction from "../../store/actions/owners.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import Header from "../header";

type OwnerFormMode = "create" | "edit";

type OwnerFormData = OwnerPayload;

const emptyForm: OwnerFormData = {
    name: "",
    birth: "",
    type: 0,
    cpf: "",
    rg: "",
    cnpj: "",
    ie: "",
    email: "",
    phone: "",
    phone2: "",
    phone3: "",
    zipCode: "",
    uf: "",
    city: "",
    neighborhood: "",
    street: "",
    streetNumber: "",
};

export default function OwnerForm({ mode }: { mode: OwnerFormMode }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { owner, loading, error } = useAppSelector((state: RootState) => state.owners);
    const [form, setForm] = useState<OwnerFormData>(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (mode === "edit" && id) {
            void dispatch(ownersAction.getOwner(Number(id)) as any);
            return;
        }

        setForm(emptyForm);
    }, [mode, id, dispatch]);

    useEffect(() => {
        if (mode === "edit" && owner) {
            setForm({ ...emptyForm, ...owner });
        }
    }, [mode, owner]);

    const handleChange = (field: keyof OwnerFormData) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = field === "type" ? Number(event.target.value) : event.target.value;

        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);

        try {
            if (mode === "edit" && id) {
                await dispatch(ownersAction.updateOwner(Number(id), form) as any);
            } else {
                await dispatch(ownersAction.createOwner(form) as any);
            }

            navigate("/owners");
        } catch (submitError) {
            console.error("Erro ao salvar proprietário:", submitError);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Header title={mode === "edit" ? "Editar proprietário" : "Novo proprietário"} />

            <Box sx={{ background: "#f3f4f6", minHeight: "100vh", py: 4 }}>
                <Box sx={{ maxWidth: 760, mx: "auto" }}>
                    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937" }}>
                                    {mode === "edit" ? "Edite o proprietário" : "Cadastre o proprietário"}
                                </Typography>
                                <Button type="button" variant="outlined" onClick={() => navigate("/owners")}>
                                    Voltar
                                </Button>
                            </Box>

                            {error && <Alert severity="error">{typeof error === "string" ? error : "Não foi possível salvar o proprietário."}</Alert>}

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="Nome" value={form.name ?? ""} onChange={handleChange("name")} required />
                                <TextField sx={{ flex: 1 }} label="Data de nascimento" type="date" value={form.birth ?? ""} onChange={handleChange("birth")} slotProps={{ inputLabel: { shrink: true } }} />
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="Tipo" select value={form.type ?? 0} onChange={handleChange("type")}>
                                    <MenuItem value={0}>Pessoa física</MenuItem>
                                    <MenuItem value={1}>Pessoa jurídica</MenuItem>
                                </TextField>
                                <TextField sx={{ flex: 1 }} label="CPF" value={form.cpf ?? ""} onChange={handleChange("cpf")} />
                                <TextField sx={{ flex: 1 }} label="RG" value={form.rg ?? ""} onChange={handleChange("rg")} />
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="CNPJ" value={form.cnpj ?? ""} onChange={handleChange("cnpj")} />
                                <TextField sx={{ flex: 1 }} label="Inscrição estadual" value={form.ie ?? ""} onChange={handleChange("ie")} />
                                <TextField sx={{ flex: 1 }} label="E-mail" type="email" value={form.email ?? ""} onChange={handleChange("email")} />
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="Telefone" value={form.phone ?? ""} onChange={handleChange("phone")} required />
                                <TextField sx={{ flex: 1 }} label="Telefone 2" value={form.phone2 ?? ""} onChange={handleChange("phone2")} />
                                <TextField sx={{ flex: 1 }} label="Telefone 3" value={form.phone3 ?? ""} onChange={handleChange("phone3")} />
                            </Stack>

                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Endereço</Typography>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="CEP" value={form.zipCode ?? ""} onChange={handleChange("zipCode")} />
                                <TextField sx={{ flex: 1 }} label="UF" value={form.uf ?? ""} onChange={handleChange("uf")} />
                                <TextField sx={{ flex: 2 }} label="Cidade" value={form.city ?? ""} onChange={handleChange("city")} />
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField sx={{ flex: 1 }} label="Bairro" value={form.neighborhood ?? ""} onChange={handleChange("neighborhood")} />
                                <TextField sx={{ flex: 2 }} label="Rua" value={form.street ?? ""} onChange={handleChange("street")} />
                                <TextField sx={{ flex: 1 }} label="Número" value={form.streetNumber ?? ""} onChange={handleChange("streetNumber")} />
                            </Stack>

                            <Stack className="d-flex flex-row justify-content-between gap-3">
                                <Button type="button" variant="text" onClick={() => navigate("/owners")}>Voltar</Button>
                                <Button type="submit" variant="contained" size="large" disabled={loading || saving}>
                                    {saving ? "Salvando..." : mode === "edit" ? "Salvar alterações" : "Cadastrar proprietário"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
