import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Auth from './view/auth'

const AppRoutes = () => (
    <BrowserRouter>
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
                            <Link to="/test2">Ir para Test2</Link>
                            <Link to="/login">Ir para login</Link>
                        </>
                    }
                />
                <Route path="/test2" element={<h1>test2</h1>} />
                <Route path="/login" element={<Auth />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
)

export default AppRoutes