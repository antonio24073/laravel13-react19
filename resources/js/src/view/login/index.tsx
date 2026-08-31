import { Box, Button, TextField, Typography } from "@mui/material"
import loginAction from "../../store/actions/login.action";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import type { RootState } from "../../store";
import { Link, Navigate, useNavigate } from "react-router-dom";



export default function Login() {
    const dispatch = useAppDispatch();
    const { authenticated } = useAppSelector(
        (state: RootState) => state.login
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <div className="d-flex bg-white min-wh-100">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group text-center">
                            <img
                                src="/logo.png" alt="CAR CRM" height="48" />
                            <Typography
                                variant="h6" component="h1"
                                sx={{ mt: 1, mb: 3 }}
                            >
                                Plataforma para Venda de Veículos
                            </Typography>
                        </div>

                        <Box
                            component="div"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                textAlign: 'left',
                            }}
                        >
                            <TextField
                                label="Email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                autoComplete="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={() => dispatch(
                                    loginAction.login({
                                        email: email,
                                        password: password,
                                    }))}
                            >Entrar</Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={() => navigate('/register')}
                            >
                                Criar uma conta
                            </Button>

                        </Box>

                        {(authenticated) &&
                            <Navigate to="/vehicles" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
