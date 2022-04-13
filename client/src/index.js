import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import AppRoutes from './AppRoutes'
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<AppRoutes />);
