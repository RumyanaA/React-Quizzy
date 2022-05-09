import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Discover from './app/discover/discover';
import Home from './app/home/home';
import Login from './pre-login/login/login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
                <Route path='/discover' exact element={<Discover />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;