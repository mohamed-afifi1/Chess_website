import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChessOffline from './chessoffline';
import App from './App';
import Online from './online';

const router = createBrowserRouter([
    { path: '/offline', element: <ChessOffline/>},
    { path: '/', element: <App />},
    { path: '*', element:  <h1>Page not found</h1> },// 404 page handler
    { path: '/online', element: <Online />}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
