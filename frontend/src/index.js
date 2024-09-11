import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChessOffline from './chessoffline';
import EasyComputer from './computer/easy_comp';

import Profile from './profile';
import App from './App';
import Online from './online';
import ChooseColor from './ChooseColor';
import { AuthProvider} from './AuthContext';


const router = createBrowserRouter([
    { path: '/offline', element: <ChessOffline /> },
    { path: '/', element: <App /> },
    { path: '*', element: <h1>Page not found</h1> },// 404 page handler
    { path: '/online', element: <ChooseColor /> },
    {path: '/online/:gameroom/:color', element: <Online />},
    { path: '/computer', element: <EasyComputer /> },
    { path: '/profile', element: <Profile /> }, // Profile route
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    </React.StrictMode>
);
