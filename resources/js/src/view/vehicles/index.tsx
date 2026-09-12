import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { MdDelete, MdDirectionsCar, MdEdit, MdMoreVert, MdOpenInNew, MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
import { rootUrl } from "../../config/App";
import vehiclesAction from "../../store/actions/vehicles.action";
import vehiclesFieldsAction from "../../store/actions/vehicles-fields.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";

export default function Vehicles() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const { vehicles, loading, error } = useAppSelector(
    (state: RootState) => state.vehicles
  );
  const vehicleModels = useAppSelector((state: RootState) => state.vehiclesFields.vehicleFields.models ?? []);

  useEffect(() => {
    dispatch(vehiclesAction.getVehicles() as any);
    dispatch(vehiclesFieldsAction.getVehiclesFields() as any);
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja excluir este veículo?")) {
      return;
    }

    try {
      await dispatch(vehiclesAction.deleteVehicle(id) as any);
    } catch (err) {
      console.error("Erro ao excluir veículo:", err);
    }
  };

  const openMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setMenuAnchor(event.currentTarget);
    setSelectedVehicleId(id);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setSelectedVehicleId(null);
  };

  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);

  const vehicleImage = (vehicle: (typeof vehicles)[number]) => {
    const photo = vehicle.vehicle_photos?.[0];

    return photo
      ? `${rootUrl}thumb/uploads/vehicles/${photo.img}?w=320&s=${vehicle.user_id}&u=${vehicle.id}`
      : null;
  };

  const vehicleModelLabel = (vehicle: (typeof vehicles)[number]) => {
    const model = vehicleModels.find((item) => Number(item.id) === Number(vehicle.vehicle_model));

    return model?.label ?? model?.name ?? model?.value ?? "Modelo não informado";
  };

  return (
    <div>
      <Header title="Veículos" />

      <div className="container mt-5 pt-5">
        <Stack className="d-flex flex-row justify-between  align-items-center mb-3">
          <Typography variant="h4">Veículos</Typography>
          <Button variant="contained" component={Link} to="/vehicles/new">
            Novo veículo
          </Button>
        </Stack>

        {loading && <Typography>Carregando...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <Paper elevation={1} sx={{ overflow: "hidden" }}>
            {vehicles.length === 0 ? (
              <Typography sx={{ p: 4, textAlign: "center" }}>Nenhum veículo encontrado.</Typography>
            ) : (
              vehicles.map((vehicle, index) => (
                <Box key={vehicle.id}>
                  {index > 0 && <Divider />}
                  <Card elevation={0} sx={{ borderRadius: 0 }}>
                    <CardContent sx={{ display: "grid", gridTemplateColumns: { xs: "88px minmax(0, 1fr)", md: "160px minmax(0, 1fr) 340px" }, gap: { xs: 1.5, md: 3 }, alignItems: "center", p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
                      <Box sx={{ height: { xs: 72, sm: 112 }, borderRadius: 1, bgcolor: "#e2e8f0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                        {vehicleImage(vehicle) ? (
                          <Box
                            component="img"
                            src={vehicleImage(vehicle) ?? undefined}
                            alt={vehicle.name ?? "Foto do veículo"}
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          <MdDirectionsCar size={44} />
                        )}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                          ID: {vehicle.id}
                        </Typography>
                        <Typography variant="h6" noWrap sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                          {vehicle.title ?? "Título do anúncio"}
                        </Typography>
                        <Typography variant="subtitle1" noWrap color="text.primary">
                          {vehicleModelLabel(vehicle)}
                        </Typography>
                        <Typography variant="h6" color="error.main" sx={{ mt: 0.75, fontWeight: 700 }}>
                          {vehicle.vehicle_price != null ? `R$ ${Number(vehicle.vehicle_price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Preço não informado"}
                        </Typography>
                      </Box>
                      <Box sx={{ position: "relative", width: "100%", minWidth: 0, pr: { xs: 3, md: 4 }, gridColumn: { xs: "1 / -1", md: "auto" } }}>
                        <IconButton aria-label={`Ações do veículo ${vehicle.id}`} onClick={(event) => openMenu(event, vehicle.id)} sx={{ position: "absolute", top: -18, right: 0 }}>
                          <MdMoreVert />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))
            )}
          </Paper>
        )}

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
          <MenuItem onClick={() => { closeMenu(); navigate(`/vehicles/${selectedVehicleId}`); }}>
            <MdOpenInNew style={{ marginRight: 16 }} /> Visualizar
          </MenuItem>
          <MenuItem
            disabled={!selectedVehicle?.vehicle_owner}
            onClick={() => {
              if (selectedVehicle?.vehicle_owner) {
                closeMenu();
                navigate(`/owners/${selectedVehicle.vehicle_owner}/edit`);
              }
            }}
          >
            <MdPerson style={{ marginRight: 16 }} /> Ver proprietário
          </MenuItem>
          <MenuItem onClick={() => { closeMenu(); navigate(`/vehicles/${selectedVehicleId}/edit`); }}>
            <MdEdit style={{ marginRight: 16 }} /> Editar
          </MenuItem>
          <MenuItem onClick={() => { if (selectedVehicle) void handleDelete(selectedVehicle.id); closeMenu(); }}>
            <MdDelete style={{ marginRight: 16 }} /> Excluir
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}