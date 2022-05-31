import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(<BrowserRouter><AppRoutes /></BrowserRouter>);
