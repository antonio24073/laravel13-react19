import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { MdDelete, MdDirectionsCar, MdEdit, MdMoreVert, MdOpenInNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
import vehiclesAction from "../../store/actions/vehicles.action";
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

  useEffect(() => {
    dispatch(vehiclesAction.getVehicles() as any);
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
                    <CardContent sx={{ display: "grid", gridTemplateColumns: "72px 132px minmax(0, 1fr) 56px", gap: { xs: 1.5, sm: 3 }, alignItems: "center", p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
                      <Box sx={{ alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid", borderColor: "divider" }}>
                        <Typography variant="caption" color="text.secondary">ID</Typography>
                        <Typography variant="h6">{vehicle.id}</Typography>
                      </Box>
                      <Box sx={{ height: 96, borderRadius: 1, bgcolor: "#172536", display: "flex", alignItems: "center", justifyContent: "center", color: "#d5e9f5" }}>
                        <MdDirectionsCar size={52} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="overline" color="text.secondary" >{vehicle.name ?? "Veículo"}</Typography>
                        <Typography variant="h6" noWrap>{vehicle.title ?? "Sem título"}</Typography>
                        <Typography variant="h6" color="error.main"  sx={{ mt: 1 }}>
                          {vehicle.vehicle_price != null ? `R$ ${Number(vehicle.vehicle_price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Preço não informado"}
                        </Typography>
                      </Box>
                      <IconButton aria-label={`Ações do veículo ${vehicle.id}`} onClick={(event) => openMenu(event, vehicle.id)}>
                        <MdMoreVert />
                      </IconButton>
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