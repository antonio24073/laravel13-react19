import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { MdDelete, MdEdit, MdMoreVert, MdPerson } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";
import ownersAction from "../../store/actions/owners.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";

export default function Owners() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
    const { owners, loading, error, pagination } = useAppSelector((state: RootState) => state.owners);

    useEffect(() => {
        void dispatch(ownersAction.getOwners() as any);
    }, [dispatch]);

    const closeMenu = () => {
        setMenuAnchor(null);
        setSelectedOwnerId(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Deseja excluir este proprietário?")) {
            return;
        }

        try {
            await dispatch(ownersAction.deleteOwner(id) as any);
        } catch (deleteError) {
            console.error("Erro ao excluir proprietário:", deleteError);
        }
    };

    return (
        <div>
            <Header title="Proprietários" />

            <div className="container mt-5 pt-5">
                <Stack className="d-flex flex-row justify-between align-items-center mb-3">
                    <Typography variant="h4">Proprietários</Typography>
                    <Button variant="contained" component={Link} to="/owners/new">
                        Novo proprietário
                    </Button>
                </Stack>

                {loading && <Typography>Carregando...</Typography>}
                {error && <Typography color="error">{error}</Typography>}

                {!loading && !error && (
                    <Paper elevation={1} sx={{ overflow: "hidden" }}>
                        {owners.length === 0 ? (
                            <Typography sx={{ p: 4, textAlign: "center" }}>Nenhum proprietário encontrado.</Typography>
                        ) : (
                            owners.map((owner, index) => (
                                <Box key={owner.id}>
                                    {index > 0 && <Divider />}
                                    <Card elevation={0} sx={{ borderRadius: 0 }}>
                                        <CardContent sx={{ display: "grid", gridTemplateColumns: { xs: "56px minmax(0, 1fr)", md: "72px minmax(0, 1fr) 220px" }, gap: { xs: 1.5, md: 3 }, alignItems: "center", p: { xs: 2, sm: 3 }, "&:last-child": { pb: { xs: 2, sm: 3 } } }}>
                                            <Box sx={{ height: { xs: 56, sm: 72 }, borderRadius: 1, bgcolor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
                                                <MdPerson size={36} />
                                            </Box>
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                                    ID: {owner.id}
                                                </Typography>
                                                <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
                                                    {owner.name ?? "Nome não informado"}
                                                </Typography>
                                                <Typography variant="body2" noWrap color="text.secondary">
                                                    {owner.phone ?? owner.email ?? "Contato não informado"}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ position: "relative", width: "100%", minWidth: 0, pr: { xs: 3, md: 4 }, gridColumn: { xs: "1 / -1", md: "auto" } }}>
                                                <Stack direction="row" spacing={1} justifyContent="center">
                                                    <Button size="small" startIcon={<MdEdit />} onClick={() => navigate(`/owners/${owner.id}/edit`)} sx={{ flex: 1 }}>
                                                        Editar
                                                    </Button>
                                                    <Button size="small" color="error" startIcon={<MdDelete />} onClick={() => void handleDelete(owner.id)} sx={{ flex: 1 }}>
                                                        Excluir
                                                    </Button>
                                                </Stack>
                                                <IconButton
                                                    aria-label={`Ações do proprietário ${owner.id}`}
                                                    onClick={(event) => {
                                                        setMenuAnchor(event.currentTarget);
                                                        setSelectedOwnerId(owner.id);
                                                    }}
                                                    sx={{ display: { xs: "inline-flex", md: "none" }, position: "absolute", top: -12, right: 0 }}
                                                >
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

                {pagination && pagination.last_page > 1 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
                        Página {pagination.current_page} de {pagination.last_page}
                    </Typography>
                )}

                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
                    <MenuItem onClick={() => { closeMenu(); navigate(`/owners/${selectedOwnerId}/edit`); }}>
                        <MdEdit style={{ marginRight: 16 }} /> Editar
                    </MenuItem>
                    <MenuItem onClick={() => { if (selectedOwnerId !== null) void handleDelete(selectedOwnerId); closeMenu(); }}>
                        <MdDelete style={{ marginRight: 16 }} /> Excluir
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}
