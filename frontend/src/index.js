import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChessOffline from './chessoffline';
import EasyComputer from './computer/easy_comp';
import HardComputer from './computer/hard_comp';
import ChooseComputer from './computer/choose_comp';
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
    {path: '/online/:color', element: <Online />},
    { path: '/computer', element: <ChooseComputer /> },  // Only show ChooseComputer on /computer
    { path: '/computer/easy_comp', element: <EasyComputer /> },  // Easy computer route
    { path: '/computer/hard_comp', element: <HardComputer /> },  // Hard computer route
    {path: '/profile', element: <Profile /> }, // Profile route
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
    </React.StrictMode>
);
