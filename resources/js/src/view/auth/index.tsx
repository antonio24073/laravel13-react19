import { Button, TextField, Typography } from "@mui/material"
import authAction from "../../store/actions/auth.action";
import { useAppDispatch } from "../../store/hooks";
import { useState } from "react";



export default function Auth() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="d-flex bg-white min-wh-100">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group">
                            <img src="/logo.png" alt="CAR CRM" height="48" />
                            <Typography className="mt-3" variant="h6" component="h1">
                                Plataforma para Venda de Veículos
                            </Typography>
                        </div>
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
                            className="mt-4 mb-4"
                            onClick={() => dispatch(
                                authAction.login({
                                    email: email,
                                    password: password,
                                }))}
                        >Entrar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
