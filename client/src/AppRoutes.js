import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Discover from './app/discover/discover';
import Home from './app/home/home';
import MenuPlanner from './app/menu-planner/menu-planner';
import Login from './app/login/login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/discover" exact element={<Discover />} />
      <Route path="/menu-planner" exact element={<MenuPlanner />} />
    </Routes>
  );
}

export default AppRoutes;
