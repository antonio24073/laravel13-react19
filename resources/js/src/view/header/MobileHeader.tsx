import { AppBar, Box, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, ListItemButton } from "@mui/material";
import { MdMenu } from 'react-icons/md'
import type { HeaderProps } from "../../models/header.types";
import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaCar, FaLaptop, FaSignOutAlt, FaUsers, FaWhatsapp } from "react-icons/fa";

export default function MobileHeader(props: HeaderProps) {
    const [menuMobileOpen, setMenuMobileOpen] = useState(false);
    const [collapse, setCollapse] = useState({ site: false, financial: false });

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setMenuMobileOpen(true)}
                        >
                            <MdMenu />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {props.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor="left" open={menuMobileOpen} onClose={() => setMenuMobileOpen(false)}>
                <div style={{ width: 320, maxWidth: window.innerWidth - 70 }}>
                    <List component="nav" className="menu-mobile">

                        <ListItem>
                            <img className="img-fluid logo-mobile" src="/logo.png" alt="AutoCRM" height="50" />
                        </ListItem>

                        <ListItem >
                            user@email.com
                        </ListItem>
                        <Divider className="mt-2 mb-3" />

                        <ListItem>
                            <ListItemIcon className="pl-4">
                                <FaCar />
                            </ListItemIcon>
                            <ListItemText className="pl-4" primary="Veículos" />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon className="pl-4">
                                <FaUsers />
                            </ListItemIcon>
                            <ListItemText className="pl-4" primary="Proprietários" />
                        </ListItem>

                        <ListItem>
                            <ListItemButton onClick={() => setCollapse({ site: !collapse.site, financial: false })}>
                                <ListItemIcon>
                                    <FaLaptop />
                                </ListItemIcon>
                                <ListItemText primary="Site" />
                                {(collapse.site) ? <FaAngleUp /> : <FaAngleDown />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={collapse.site} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Otimização para o Google" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Unidades e telefones" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Minha logo" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Domínio" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Configurações" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem>
                            <ListItemButton onClick={() => setCollapse({ financial: !collapse.financial, site: false })}>
                                <ListItemIcon>
                                    <FaLaptop />
                                </ListItemIcon>
                                <ListItemText primary="Financeiro" />
                                {(collapse.financial) ? <FaAngleUp /> : <FaAngleDown />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={collapse.financial} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Meu plano" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className="pl-5" primary="Minhas transações" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem>
                            <ListItemIcon className="pl-4">
                                <FaWhatsapp />
                            </ListItemIcon>
                            <ListItemText className="pl-4" primary="Ajuda" />
                        </ListItem>

                        <Divider className="mt-2 mb-3" />

                        <ListItem>
                            <ListItemIcon className="pl-4">
                                <FaSignOutAlt />
                            </ListItemIcon>
                            <ListItemText className="pl-4" primary="Sair" />
                        </ListItem>

                    </List>
                </div>
            </Drawer>
        </>
    )
}
