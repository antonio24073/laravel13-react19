import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Auth from './view/auth'
import type { RootState } from './store'
import { useAppSelector } from './store/hooks'

const AppRoutes = () => {

    const { authenticated } = useAppSelector(
        (state: RootState) => state.auth
    );

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
                            <h1>test1</h1>
                            <br/>
                            <Link to="/sem-autenticacao">Ir para página sem autenticacao</Link>
                            <br/>
                            <Link to="/login">Ir para login</Link>
                        </>
                    }
                />
                <Route path="/sem-autenticacao" element={<h1>Página sem autenticacao</h1>} />
                <Route path="/login" element={<Auth />} />
                <Route path="/vehicles" element={<h1>vehicles</h1>} />
            </Routes>
        </Suspense>
    </BrowserRouter>;
}

export default AppRoutes