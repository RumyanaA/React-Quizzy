import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './app/layout/header/header-component';
import Wrapper from './app/layout/main-content/content-wrapper-component';
import Login from './pre-login/login/login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Wrapper />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;