import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pre-login/login/login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" exact element={<Login />} />
                {/* <Route path="/signup" exact component={Signup} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;