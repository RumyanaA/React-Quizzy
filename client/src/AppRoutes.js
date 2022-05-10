import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Discover from './app/discover/discover';
import Home from './app/home/home';
import MenuPlanner from './app/menu-planner/menu-planner';
import Login from './pre-login/login/login';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/home" exact element={<Home />} />
                <Route path='/discover' exact element={<Discover />}></Route>
                <Route path='/menu-planner' exact element={<MenuPlanner />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;