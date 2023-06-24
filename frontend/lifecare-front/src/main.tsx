import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { ErrorComponent } from './Components/index.tsx';
import {
  AdminHome,
  Login,
  UserHome } from './Pages';
import { Role } from './Types/Usertypes.ts';
import PrivateRoute from './privateRoute.tsx';
import { isAuthenticated } from './Services/auth.ts';

const { auth, role } = isAuthenticated();

const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to={!auth ? "/login" : role === Role.Admin ? "/home" : "/user-home" } /> 
  },
  {
    path: "/",
    element: <PrivateRoute roleRequired={Role.Admin} />,
    errorElement: <ErrorComponent />,
    children:[
        {
          path: "/home",
          element: <AdminHome />,
        }
    ],
  },
  {
    path: "/",
    element: <PrivateRoute roleRequired={Role.User} />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/user-home",
        element: <UserHome />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "*",
    element: <ErrorComponent />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
