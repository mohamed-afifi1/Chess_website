import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChessOffline from './chessoffline';
import App from './App';

const router = createBrowserRouter([
    { path: '/offline', element: <ChessOffline/>},
    { path: '/', element: <App />},
    { path: '*', element: () => <h1>Page not found</h1> } // 404 page handler
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
