import { CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

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
                        </>
                    }
                />
                <Route path="/test2" element={<h1>test2</h1>} />
            </Routes>
        </Suspense>
    </BrowserRouter>
)

export default AppRoutes