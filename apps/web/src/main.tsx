import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SurauPage from './pages/Surau.tsx';
import ViewSurauPage from './pages/ViewSurau.tsx';
import UserPage from './pages/User.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/surau",
        element: <SurauPage />
      },
      {
        path: "/surau/:id",
        element: <ViewSurauPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
