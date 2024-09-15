import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChessOffline from './components/chessModes/chessOffline';
import Computer from './components/chessModes/chessComputer';

import Profile from './components/profile/profile';
import App from './App';
import Online from './components/chessModes/chessOnline';
import ChooseColor from './components/controllers/chooseColor';
import { AuthProvider } from './context/authContext';


const router = createBrowserRouter([
    { path: '/offline', element: <ChessOffline /> },
    { path: '/', element: <App /> },
    { path: '*', element: <h1>Page not found</h1> },// 404 page handler
    { path: '/online', element: <ChooseColor /> },
    { path: '/online/:gameroom/:color', element: <Online /> },
    { path: '/computer', element: <Computer /> },
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
