import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const isAuthenticated = Boolean(localStorage.getItem("authToken"));
    return isAuthenticated
        ? children
        : <Navigate to="/login" replace state={{ from: location }} />;
}

export default PrivateRoute;