import React from "react";
import { Navigate} from "react-router-dom";

const PrivetRout = ({children}) => {
    const isAuthenticated = Boolean(localStorage.getItem("LoginData"));
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivetRout;