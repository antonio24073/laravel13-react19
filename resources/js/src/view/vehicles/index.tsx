import { useEffect } from "react";
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
import vehiclesAction from "../../store/actions/vehicles.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";

export default function Vehicles() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Nenhum veículo encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.id}</TableCell>
                      <TableCell>{vehicle.name ?? "-"}</TableCell>
                      <TableCell>{vehicle.title ?? "-"}</TableCell>
                      <TableCell>
                        {vehicle.vehicle_price != null ? `R$ ${vehicle.vehicle_price}` : "-"}
                      </TableCell>
                      <TableCell>{vehicle.status === 1 ? "Ativo" : "Inativo"}</TableCell>
                      <TableCell align="right">
                        <Stack className="d-flex flex-row justify-content-end align-items-center p-1">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(vehicle.id)}
                          >
                            Excluir
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}