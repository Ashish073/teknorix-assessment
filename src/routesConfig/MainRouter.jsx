import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Loader from '../components/Loader';

function MainRouter() {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact
                            element={<route.element />}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default MainRouter