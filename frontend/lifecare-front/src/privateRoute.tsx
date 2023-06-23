import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Services/auth';
import { Role } from './Types/Usertypes';
import { LayoutContainer } from './Components';

interface PrivateRouteProps {
  roleRequired?: Role.Admin | Role.User;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roleRequired }) => {
    const {auth, role} = isAuthenticated();

    if(roleRequired)
    {
        return auth ? (
            roleRequired === role ? 
                <LayoutContainer /> : role === Role.Admin ?
                    <Navigate to="/home" /> : role === Role.User ? 
                        <Navigate to="user-home" /> : <Navigate to="/login"/>
            ) : (
            <Navigate to="/login"/>
            );
    } else {
        return auth ? <Outlet /> : <Navigate to="/login" />
    }
}

export default PrivateRoute;
