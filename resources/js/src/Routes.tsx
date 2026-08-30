import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const Login = lazy(() => import('./view/login'));
const Register = lazy(() => import('./view/register'));

const AppRoutes = () => {
    return <BrowserRouter>
        <Suspense
            fallback={
                <div className="d-flex justify-content-center mt-5 pt-5">
                    <CircularProgress />
                </div>
            }
        >
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>Home</h1>
                            <br />
                            <Link to="/login">Login</Link>
                            <br />
                            <Link to="/register">Register</Link>
                            <br />
                            <Link to="/vehicles">Vehicles</Link>
                        </>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/vehicles" element={<h1>Vehicles</h1>} />
            </Routes>
        </Suspense>
    </BrowserRouter>;
}

export default AppRoutes