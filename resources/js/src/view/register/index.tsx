import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register } from '../../store/thunks/register.thunk';

export default function Register() {
    const dispatch = useAppDispatch();

    const { loading, success, error } = useAppSelector(
        (state) => state.register
    );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(
            register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
        );
    };

    return (
        <div className="d-flex bg-white min-vh-100">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <Box
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                height="48"
                                src="/logo.png"
                                alt="Logo"
                            />

                            <Typography
                                className="mt-3"
                                variant="h6"
                                component="h1"
                                sx={{ fontWeight: 600 }}
                            >
                                Crie sua conta, teste grátis!
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1, mb: 3 }}
                            >
                                Preencha os dados abaixo para criar sua conta.
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    textAlign: 'left',
                                }}
                            >
                                <TextField
                                    label="Nome"
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    disabled={loading}
                                    required
                                    fullWidth
                                    autoComplete="name"
                                    error={!!error?.name}
                                    helperText={error?.name?.[0]}
                                />

                                <TextField
                                    label="E-mail"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    disabled={loading}
                                    required
                                    fullWidth
                                    autoComplete="email"
                                    error={!!error?.email}
                                    helperText={error?.email?.[0]}
                                />

                                <TextField
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    disabled={loading}
                                    required
                                    fullWidth
                                    autoComplete="new-password"
                                    error={!!error?.password}
                                    helperText={error?.password?.[0]}
                                />

                                <TextField
                                    label="Confirmar senha"
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(event) =>
                                        setPasswordConfirmation(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    required
                                    fullWidth
                                    autoComplete="new-password"
                                    error={!!error?.password_confirmation}
                                    helperText={error?.password_confirmation?.[0]}
                                />
                                
                                {error?.general && (
                                    <Alert severity="error">
                                        {error.general[0]}
                                    </Alert>
                                )}

                                {success && (
                                    <Alert severity="success">
                                        Cadastro realizado com sucesso!
                                    </Alert>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading
                                        ? 'Cadastrando...'
                                        : 'Criar minha conta'}
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

