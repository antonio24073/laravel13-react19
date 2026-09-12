import {
    Alert,
    Autocomplete,
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
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vehicle, VehiclePayload } from "../../models/vehicles.types";
import { rootUrl } from "../../config/App";
import vehiclesAction from "../../store/actions/vehicles.action";
import vehiclesFieldsAction from "../../store/actions/vehicles-fields.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import Header from "../header";
import SortablePhotoUpload, { type SortablePhoto } from "../components/SortablePhotoUpload";

type VehicleFormMode = "create" | "edit";

type VehicleFormData = VehiclePayload & {
    status?: number;
};

const colorOptions = ["Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul"];

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
    const { vehicleFields } = useAppSelector((state: RootState) => state.vehiclesFields);

    const brandOptions = vehicleFields.brands ?? [];
    const yearOptions = vehicleFields.regdate ?? [];
    const gearboxOptions = vehicleFields.gearbox ?? [];
    const steeringOptions = vehicleFields.car_steering ?? [];
    const powerOptions = vehicleFields.motorpower ?? [];
    const doorsOptions = vehicleFields.doors ?? [];
    const fuelOptions = vehicleFields.fuel ?? [];
    const typeOptions = vehicleFields.vehicle_types ?? [];
    const featureOptions = (vehicleFields.features ?? []).map((item) => item.label ?? item.name ?? String(item.value ?? item.id ?? ""));
    const vehiclePhotos = (selectedVehicle?.vehicle_photos ?? [])
        .map<SortablePhoto>((photo) => ({
            id: photo.id,
            src: `${rootUrl}uploads/vehicles/${selectedVehicle?.user_id}/${selectedVehicle?.id}/${photo.img}`,
            name: photo.img,
        }));

    const [form, setForm] = useState<VehicleFormData>(emptyForm);
    const formRef = useRef<VehicleFormData>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [brandSearch, setBrandSearch] = useState("");
    const [modelSearch, setModelSearch] = useState("");
    const [versionSearch, setVersionSearch] = useState("");

    const modelOptions = (vehicleFields.models ?? []).filter((model) =>
        form.vehicle_brand === null || Number(model.brand_id) === form.vehicle_brand
    );
    const versionOptions = (vehicleFields.versions ?? []).filter((version) =>
        form.vehicle_model === null || Number(version.model_id) === form.vehicle_model
    );

    useEffect(() => {
        dispatch(vehiclesFieldsAction.getVehiclesFields() as any);
    }, [dispatch]);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            void dispatch(vehiclesFieldsAction.searchVehicleField("brands", {
                search: brandSearch,
                value: form.vehicle_brand,
            }) as any);
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [brandSearch, form.vehicle_brand, dispatch]);

    useEffect(() => {
        if (form.vehicle_brand === null) {
            return;
        }

        const timeout = window.setTimeout(() => {
            void dispatch(vehiclesFieldsAction.searchVehicleField("models", {
                search: modelSearch,
                brand_id: form.vehicle_brand,
                value: form.vehicle_model,
            }) as any);
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [modelSearch, form.vehicle_brand, form.vehicle_model, dispatch]);

    useEffect(() => {
        if (form.vehicle_model === null) {
            return;
        }

        const timeout = window.setTimeout(() => {
            void dispatch(vehiclesFieldsAction.searchVehicleField("versions", {
                search: versionSearch,
                model_id: form.vehicle_model,
                value: form.vehicle_version,
            }) as any);
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [versionSearch, form.vehicle_model, form.vehicle_version, dispatch]);

    useEffect(() => {
        if (mode === "edit" && id) {
            dispatch(vehiclesAction.getVehicle(Number(id)) as any);
            return;
        }

        setForm(emptyForm);
        formRef.current = emptyForm;
        setSelectedFeatures([]);
    }, [mode, id, dispatch]);

    useEffect(() => {
        if (mode === "edit" && selectedVehicle) {
            const parsedVehicle = parseVehicle(selectedVehicle);
            setForm(parsedVehicle);
            formRef.current = parsedVehicle;

            let savedFeatures: unknown = selectedVehicle.vehicle_features;
            if (typeof savedFeatures === "string") {
                try {
                    savedFeatures = JSON.parse(savedFeatures) as Record<string, unknown>;
                } catch {
                    savedFeatures = null;
                }
            }

            const featureValues = Array.isArray(savedFeatures)
                ? savedFeatures
                : savedFeatures && typeof savedFeatures === "object"
                    ? Object.values(savedFeatures)
                    : [];

            setSelectedFeatures(featureValues.filter((feature): feature is string => typeof feature === "string"));
        }
    }, [mode, selectedVehicle]);

    const updateField = <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => {
        formRef.current = {
            ...formRef.current,
            [field]: value,
        };
    };

    const updateSelectField = <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => {
        updateField(field, value);
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const fieldValue = (item: Record<string, unknown> | null) =>
        item ? Number(item.value ?? item.id) : null;

    const selectedOption = (options: Record<string, unknown>[], value: number | null | undefined) =>
        options.find((option) => fieldValue(option) === value) ?? null;

    const handleTextChange = (field: keyof VehicleFormData) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;

        if (field === "status" || field === "vehicle_price" || field === "vehicle_mileage") {
            const numericValue = Number(value) as VehicleFormData[typeof field];
            updateField(field, numericValue);
            setForm((current) => ({
                ...current,
                [field]: numericValue,
            }));
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

    const optionLabel = (item: Record<string, unknown> | undefined, fallback = "") =>
        String(item?.label ?? item?.name ?? item?.value ?? fallback ?? "");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);

        try {
            const formFields = { ...formRef.current } as VehicleFormData & {
                photos?: unknown;
                vehicle_photos?: unknown;
            };
            delete formFields.photos;
            delete formFields.vehicle_photos;

            const payload: VehiclePayload = {
                ...formFields,
                name: formFields.name ?? "",
                title: formFields.title ?? "",
                description: formFields.description ?? "",
                vehicle_price: Number(formFields.vehicle_price ?? 0),
                vehicle_mileage: Number(formFields.vehicle_mileage ?? 0),
                status: Number(formFields.status ?? 0),
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
                        <Stack
                            key={`${mode}-${selectedVehicle?.id ?? "new"}-${selectedVehicle?.updated_at ?? ""}`}
                            spacing={3}
                            component="form"
                            onSubmit={handleSubmit}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && event.target instanceof HTMLElement && event.target.closest(".MuiAutocomplete-root")) {
                                    event.preventDefault();
                                }
                            }}
                        >
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
                                    defaultValue={form.title ?? ""}
                                    onChange={handleTextChange("title")}
                                    placeholder="Toyota Corolla S 1.8 16V Flex Aut. 2003"
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Descrição
                                </Typography>
                                <TextField
                                    defaultValue={form.description ?? ""}
                                    onChange={handleTextChange("description")}
                                    multiline
                                    minRows={4}
                                    placeholder="Seu anúncio aqui..."
                                />
                            </Box>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    sx={{ flex: 1 }}
                                    label="Placa do carro"
                                    defaultValue={form.tag_id ?? ""}
                                    onChange={(event) => updateField("tag_id", Number(event.target.value) || null)}
                                    placeholder="DLF123"
                                />
                                <TextField
                                    sx={{ flex: 1 }}
                                    select
                                    label="Ano do veículo"
                                    value={form.vehicle_regdate ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_regdate", Number(event.target.value))}
                                >
                                    {yearOptions.map((year: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(year.id ?? year.value ?? index)} value={Number(year.id ?? index + 1)}>
                                            {optionLabel(year, `Ano ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <Autocomplete<Record<string, unknown>>
                                    sx={{ flex: 1, minWidth: 0 }}
                                    options={brandOptions as Record<string, unknown>[]}
                                    value={selectedOption(brandOptions as Record<string, unknown>[], form.vehicle_brand)}
                                    inputValue={brandSearch}
                                    onInputChange={(_, value) => setBrandSearch(value)}
                                    onChange={(_, value) => {
                                        const brandId = fieldValue(value as Record<string, unknown> | null);
                                        updateSelectField("vehicle_brand", brandId);
                                        updateSelectField("vehicle_model", null);
                                        updateSelectField("vehicle_version", null);
                                        setModelSearch("");
                                        setVersionSearch("");
                                    }}
                                    isOptionEqualToValue={(option, value) => fieldValue(option) === fieldValue(value)}
                                    getOptionKey={(option) => String(fieldValue(option))}
                                    getOptionLabel={(option) => optionLabel(option)}
                                    loading={loading}
                                    renderInput={(params) => <TextField {...params} label="Marca" />}
                                />

                                <Autocomplete<Record<string, unknown>>
                                    sx={{ flex: 1, minWidth: 0 }}
                                    options={modelOptions as Record<string, unknown>[]}
                                    value={selectedOption(modelOptions as Record<string, unknown>[], form.vehicle_model)}
                                    inputValue={modelSearch}
                                    onInputChange={(_, value) => setModelSearch(value)}
                                    onChange={(_, value) => {
                                        const modelId = fieldValue(value as Record<string, unknown> | null);
                                        updateSelectField("vehicle_model", modelId);
                                        updateSelectField("vehicle_version", null);
                                        setVersionSearch("");
                                    }}
                                    isOptionEqualToValue={(option, value) => fieldValue(option) === fieldValue(value)}
                                    getOptionLabel={(option) => optionLabel(option)}
                                    loading={loading || form.vehicle_brand === null}
                                    disabled={form.vehicle_brand === null}
                                    renderInput={(params) => <TextField {...params} label="Modelo" />}
                                />
                                <Autocomplete<Record<string, unknown>>
                                    sx={{ flex: 1, minWidth: 0 }}
                                    options={versionOptions as Record<string, unknown>[]}
                                    value={selectedOption(versionOptions as Record<string, unknown>[], form.vehicle_version)}
                                    inputValue={versionSearch}
                                    onInputChange={(_, value) => setVersionSearch(value)}
                                    onChange={(_, value) => updateSelectField("vehicle_version", fieldValue(value as Record<string, unknown> | null))}
                                    isOptionEqualToValue={(option, value) => fieldValue(option) === fieldValue(value)}
                                    getOptionLabel={(option) => optionLabel(option)}
                                    loading={loading || form.vehicle_model === null}
                                    disabled={form.vehicle_model === null}
                                    renderInput={(params) => <TextField {...params} label="Versão" />}
                                />
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Câmbio"
                                    value={form.vehicle_gearbox ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_gearbox", Number(event.target.value))}
                                >
                                    {gearboxOptions.map((gearbox: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(gearbox.id ?? gearbox.value ?? index)} value={Number(gearbox.id ?? index + 1)}>
                                            {optionLabel(gearbox, `Câmbio ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Direção"
                                    value={form.vehicle_steering ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_steering", Number(event.target.value))}
                                >
                                    {steeringOptions.map((steering: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(steering.id ?? steering.value ?? index)} value={Number(steering.id ?? index + 1)}>
                                            {optionLabel(steering, `Direção ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Potência"
                                    value={form.vehicle_motorpower ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_motorpower", Number(event.target.value))}
                                >
                                    {powerOptions.map((power: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(power.id ?? power.value ?? index)} value={Number(power.id ?? index + 1)}>
                                            {optionLabel(power, `Potência ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Portas"
                                    value={form.vehicle_doors ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_doors", Number(event.target.value))}
                                >
                                    {doorsOptions.map((door: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(door.id ?? door.value ?? index)} value={Number(door.id ?? index + 1)}>
                                            {optionLabel(door, `Portas ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    select
                                    label="Combustível"
                                    value={form.vehicle_fuel ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_fuel", Number(event.target.value))}
                                >
                                    {fuelOptions.map((fuel: Record<string, unknown>, index: number) => (
                                        <MenuItem key={String(fuel.id ?? fuel.value ?? index)} value={Number(fuel.id ?? index + 1)}>
                                            {optionLabel(fuel, `Combustível ${index + 1}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Cor"
                                    value={form.vehicle_color ?? ""}
                                    onChange={(event) => updateSelectField("vehicle_color", Number(event.target.value))}
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
                                onChange={(event) => updateSelectField("vehicle_type", Number(event.target.value))}
                            >
                                {typeOptions.map((type: Record<string, unknown>, index: number) => (
                                    <MenuItem key={String(type.id ?? type.value ?? index)} value={Number(type.id ?? index + 1)}>
                                        {optionLabel(type, `Tipo ${index + 1}`)}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Quilometragem (km)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={form.vehicle_mileage ?? ""}
                                    onChange={handleTextChange("vehicle_mileage")}
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 2, display: "block" }}>
                                    Itens e opções do veículo
                                </Typography>
                                <Stack className="d-flex flex-row flex-wrap gap-2">
                                    {featureOptions.length > 0 ? featureOptions.map((feature, index) => (
                                        <Chip
                                            key={`${feature}-${index}`}
                                            label={feature}
                                            color={selectedFeatures.includes(feature) ? "primary" : "default"}
                                            variant={selectedFeatures.includes(feature) ? "filled" : "outlined"}
                                            onClick={() => toggleFeature(feature)}
                                            sx={{ mb: 1 }}
                                        />
                                    )) : (
                                        <Typography variant="body2" color="text.secondary">
                                            Sem opções de itens disponíveis.
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Preço (R$)
                                </Typography>
                                <TextField
                                    type="number"
                                    value={form.vehicle_price ?? ""}
                                    onChange={handleTextChange("vehicle_price")}
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Fotos
                                </Typography>
                                <SortablePhotoUpload
                                    photos={vehiclePhotos}
                                    vehicleId={mode === "edit" && id ? Number(id) : undefined}
                                    disabled={saving}
                                />
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {mode === "edit" ? "Adicione, arraste ou exclua as imagens do veículo." : "Salve o anúncio antes de adicionar fotos."}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151", mb: 1, display: "block" }}>
                                    Localização
                                </Typography>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                    <TextField
                                        label="CEP"
                                        defaultValue={form.zipCode ?? ""}
                                        onChange={handleTextChange("zipCode")}
                                    />
                                    <TextField
                                        label="Cidade"
                                        defaultValue={form.city ?? ""}
                                        onChange={handleTextChange("city")}
                                    />
                                    <TextField
                                        label="UF"
                                        defaultValue={form.uf ?? ""}
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
