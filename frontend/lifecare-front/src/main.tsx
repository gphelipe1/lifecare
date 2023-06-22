import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { ErrorComponent, LayoutContainer } from './Components/index.tsx';
import { Login, RecordDetail, UserHome } from './Pages';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutContainer />,
    children: [
      {
        path: "/home",
        element: <UserHome />,
      },
      {
        path: "/record/:recordId",
        element: <RecordDetail/>,
      },
      {
        path: "*",
        element: <Navigate to="/home" />
      },
    ],
    errorElement: <ErrorComponent />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to="/login" />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
