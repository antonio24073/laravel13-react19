import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vehicle, VehiclePayload } from "../../models/vehicles.types";
import vehiclesAction from "../../store/actions/vehicles.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import Header from "../header";

type VehicleFormMode = "create" | "edit";

type VehicleFormData = VehiclePayload & {
    status?: number;
};

const brandOptions = ["Toyota", "Honda", "Volkswagen", "Chevrolet", "Ford", "Fiat"]; 
const modelOptions = ["Corolla", "Civic", "Gol", "Onix", "Focus", "Palio"]; 
const yearOptions = ["2003", "2005", "2008", "2010", "2014", "2019", "2023"]; 
const versionOptions = ["1.0", "1.4", "1.6", "1.8", "2.0", "2.4"]; 
const gearboxOptions = ["Automático", "Manual", "CVT"]; 
const steeringOptions = ["Hidráulica", "Elétrica", "Assistida"]; 
const powerOptions = ["1.0", "1.4", "1.6", "1.8", "2.0"]; 
const doorsOptions = ["2", "3", "4"]; 
const colorOptions = ["Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul"]; 
const fuelOptions = ["Gasolina", "Etanol", "Flex", "Diesel"]; 
const typeOptions = ["Sedã", "Hatch", "SUV", "Picape", "Coupê"]; 
const featureOptions = [
    "Ar condicionado",
    "Direção hidráulica",
    "Vidro elétrico",
    "Travas elétricas",
    "Airbag",
    "Alarme",
    "Blindado",
    "Câmera de ré",
    "Controle de tração",
    "GPS",
    "Teto solar",
];

const emptyForm: VehicleFormData = {
    name: "",
    title: "",
    description: "",
    status: 0,
    vehicle_price: 0,
    zipCode: "",
    city: "",
    uf: "",
    vehicle_mileage: 0,
    vehicle_brand: null,
    vehicle_model: null,
    vehicle_regdate: null,
    vehicle_version: null,
    vehicle_gearbox: null,
    vehicle_steering: null,
    vehicle_motorpower: null,
    vehicle_doors: null,
    vehicle_color: null,
    vehicle_fuel: null,
    vehicle_type: null,
    vehicle_features: null,
    vehicle_moto_features: null,
    vehicle_financial: null,
};

const parseVehicle = (vehicle?: Partial<Vehicle> | null): VehicleFormData => ({
    ...emptyForm,
    ...(vehicle ?? {}),
    name: vehicle?.name ?? "",
    title: vehicle?.title ?? "",
    description: vehicle?.description ?? "",
    status: vehicle?.status ?? 0,
    vehicle_price: vehicle?.vehicle_price ?? 0,
    zipCode: vehicle?.zipCode ?? "",
    city: vehicle?.city ?? "",
    uf: vehicle?.uf ?? "",
    vehicle_mileage: vehicle?.vehicle_mileage ?? 0,
    vehicle_brand: vehicle?.vehicle_brand ?? null,
    vehicle_model: vehicle?.vehicle_model ?? null,
    vehicle_regdate: vehicle?.vehicle_regdate ?? null,
    vehicle_version: vehicle?.vehicle_version ?? null,
    vehicle_gearbox: vehicle?.vehicle_gearbox ?? null,
    vehicle_steering: vehicle?.vehicle_steering ?? null,
    vehicle_motorpower: vehicle?.vehicle_motorpower ?? null,
    vehicle_doors: vehicle?.vehicle_doors ?? null,
    vehicle_color: vehicle?.vehicle_color ?? null,
    vehicle_fuel: vehicle?.vehicle_fuel ?? null,
    vehicle_type: vehicle?.vehicle_type ?? null,
});

export default function VehicleForm({ mode }: { mode: VehicleFormMode }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const selectedVehicle = useAppSelector((state: RootState) => state.vehicles.vehicle);
    const { loading, error } = useAppSelector((state: RootState) => state.vehicles);

    const [form, setForm] = useState<VehicleFormData>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    useEffect(() => {
        if (mode === "edit" && id) {
            dispatch(vehiclesAction.getVehicle(Number(id)) as any);
            return;
        }

        setForm(emptyForm);
        setSelectedFeatures([]);
    }, [mode, id, dispatch]);

    useEffect(() => {
        if (mode === "edit" && selectedVehicle) {
            setForm(parseVehicle(selectedVehicle));
        }
    }, [mode, selectedVehicle]);

    const updateField = <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleTextChange = (field: keyof VehicleFormData) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        if (field === "status" || field === "vehicle_price" || field === "vehicle_mileage") {
            updateField(field, Number(value) as VehicleFormData[typeof field]);
            return;
        }

        updateField(field, value as VehicleFormData[typeof field]);
    };

    const toggleFeature = (feature: string) => {
        setSelectedFeatures((current) =>
            current.includes(feature)
                ? current.filter((item) => item !== feature)
                : [...current, feature]
        );
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);

        try {
            const payload: VehiclePayload = {
                ...form,
                name: form.name ?? "",
                title: form.title ?? "",
                description: form.description ?? "",
                vehicle_price: Number(form.vehicle_price ?? 0),
                vehicle_mileage: Number(form.vehicle_mileage ?? 0),
                status: Number(form.status ?? 0),
                vehicle_features: selectedFeatures.length
                    ? selectedFeatures.reduce<Record<string, string>>((accumulator, feature, index) => {
                        accumulator[`feature_${index + 1}`] = feature;
                        return accumulator;
                    }, {})
                    : null,
            };

            if (mode === "edit" && id) {
                await dispatch(vehiclesAction.updateVehicle(Number(id), payload) as any);
            } else {
                await dispatch(vehiclesAction.createVehicle(payload) as any);
            }

            navigate("/vehicles");
        } catch (submitError) {
            console.error("Erro ao salvar veículo:", submitError);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Header title={mode === "edit" ? "Editar veículo" : "Novo veículo"} />

            <Box sx={{ background: "#f3f4f6", minHeight: "100vh", py: 4 }}>
                <Box sx={{ maxWidth: 760, mx: "auto" }}>
                    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
                        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: "#1f2937" }}>
                                    Edite seu anúncio
                                </Typography>
                                <Button variant="outlined" onClick={() => navigate("/vehicles")}>
                                    Voltar
                                </Button>
                            </Box>

                            {error && <Alert severity="error">{error}</Alert>}

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Título
                                </Typography>
                                <TextField
                                    value={form.title ?? ""}
                                    onChange={handleTextChange("title")}
                                    placeholder="Toyota Corolla S 1.8 16V Flex Aut. 2003"
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Descrição
                                </Typography>
                                <TextField
                                    value={form.description ?? ""}
                                    onChange={handleTextChange("description")}
                                    multiline
                                    minRows={4}
                                    placeholder="Seu anúncio aqui..."
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Placa do carro
                                </Typography>
                                <TextField
                                    value={form.tag_id ?? ""}
                                    onChange={(event) => updateField("tag_id", Number(event.target.value) || null)}
                                    placeholder="DLF123"
                                />
                            </Box>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Marca"
                                    value={form.vehicle_brand ?? ""}
                                    onChange={(event) => updateField("vehicle_brand", Number(event.target.value))}
                                >
                                    {brandOptions.map((brand, index) => (
                                        <MenuItem key={brand} value={index + 1}>{brand}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Modelo"
                                    value={form.vehicle_model ?? ""}
                                    onChange={(event) => updateField("vehicle_model", Number(event.target.value))}
                                >
                                    {modelOptions.map((model, index) => (
                                        <MenuItem key={model} value={index + 1}>{model}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Ano do veículo"
                                    value={form.vehicle_regdate ?? ""}
                                    onChange={(event) => updateField("vehicle_regdate", Number(event.target.value))}
                                >
                                    {yearOptions.map((year, index) => (
                                        <MenuItem key={year} value={index + 2000}>{year}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Versão"
                                    value={form.vehicle_version ?? ""}
                                    onChange={(event) => updateField("vehicle_version", Number(event.target.value))}
                                >
                                    {versionOptions.map((version, index) => (
                                        <MenuItem key={version} value={index + 1}>{version}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Câmbio"
                                    value={form.vehicle_gearbox ?? ""}
                                    onChange={(event) => updateField("vehicle_gearbox", Number(event.target.value))}
                                >
                                    {gearboxOptions.map((gearbox, index) => (
                                        <MenuItem key={gearbox} value={index + 1}>{gearbox}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Direção"
                                    value={form.vehicle_steering ?? ""}
                                    onChange={(event) => updateField("vehicle_steering", Number(event.target.value))}
                                >
                                    {steeringOptions.map((steering, index) => (
                                        <MenuItem key={steering} value={index + 1}>{steering}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Potência"
                                    value={form.vehicle_motorpower ?? ""}
                                    onChange={(event) => updateField("vehicle_motorpower", Number(event.target.value))}
                                >
                                    {powerOptions.map((power, index) => (
                                        <MenuItem key={power} value={index + 1}>{power}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Portas"
                                    value={form.vehicle_doors ?? ""}
                                    onChange={(event) => updateField("vehicle_doors", Number(event.target.value))}
                                >
                                    {doorsOptions.map((door, index) => (
                                        <MenuItem key={door} value={index + 1}>{door}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Combustível"
                                    value={form.vehicle_fuel ?? ""}
                                    onChange={(event) => updateField("vehicle_fuel", Number(event.target.value))}
                                >
                                    {fuelOptions.map((fuel, index) => (
                                        <MenuItem key={fuel} value={index + 1}>{fuel}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Cor"
                                    value={form.vehicle_color ?? ""}
                                    onChange={(event) => updateField("vehicle_color", Number(event.target.value))}
                                >
                                    {colorOptions.map((color, index) => (
                                        <MenuItem key={color} value={index + 1}>{color}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <TextField
                                select
                                label="Tipo do veículo"
                                value={form.vehicle_type ?? ""}
                                onChange={(event) => updateField("vehicle_type", Number(event.target.value))}
                            >
                                {typeOptions.map((type, index) => (
                                    <MenuItem key={type} value={index + 1}>{type}</MenuItem>
                                ))}
                            </TextField>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Quilometragem (km)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={form.vehicle_mileage ?? 0}
                                    onChange={handleTextChange("vehicle_mileage")}
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 2, display: "block" }}>
                                    Itens e opções do veículo
                                </Typography>
                                <Stack className="d-flex flex-row flex-wrap gap-2">
                                    {featureOptions.map((feature) => (
                                        <Chip
                                            key={feature}
                                            label={feature}
                                            color={selectedFeatures.includes(feature) ? "primary" : "default"}
                                            variant={selectedFeatures.includes(feature) ? "filled" : "outlined"}
                                            onClick={() => toggleFeature(feature)}
                                            sx={{ mb: 1 }}
                                        />
                                    ))}
                                </Stack>
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Preço (R$)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={form.vehicle_price ?? 0}
                                    onChange={handleTextChange("vehicle_price")}
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Fotos
                                </Typography>
                                <Box sx={{ border: "1px dashed #cbd5e1", borderRadius: 2, p: 2, textAlign: "center", background: "#f8fafc" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Adicionar mais fotos
                                    </Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Localização
                                </Typography>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                    <TextField
                                        label="CEP"
                                        value={form.zipCode ?? ""}
                                        onChange={handleTextChange("zipCode")}
                                    />
                                    <TextField
                                        label="Cidade"
                                        value={form.city ?? ""}
                                        onChange={handleTextChange("city")}
                                    />
                                    <TextField
                                        label="UF"
                                        value={form.uf ?? ""}
                                        onChange={handleTextChange("uf")}
                                    />
                                </Stack>
                            </Box>

                            <Divider />

                            <Stack className="d-flex flex-row justify-content-between gap-3">
                                <Button type="button" variant="text" onClick={() => navigate("/vehicles")}>
                                    Voltar
                                </Button>
                                <Button type="submit" variant="contained" size="large" disabled={loading || saving}>
                                    {saving ? "Salvando..." : mode === "edit" ? "Editar anúncio" : "Publicar anúncio"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
