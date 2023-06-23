import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { ErrorComponent } from './Components/index.tsx';
import { AdminHome, Login, RecordDetail, UserHome } from './Pages';
import { Role } from './Types/Usertypes.ts';
import PrivateRoute from './privateRoute.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute roleRequired={Role.Admin} />,
    children:[
        {
          path: "/home",
          element: <AdminHome />,
        },
        {
          path: "/new-admin",
          element: <div></div>,
        },
        {
          path: "*",
          element: <Navigate to="/" />
        },
    ],
    errorElement: <ErrorComponent />
  },
  {
    path: "",
    element: <PrivateRoute roleRequired={Role.User} />,
    children: [
      {
        path: "/user-home",
        element: <UserHome />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
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
