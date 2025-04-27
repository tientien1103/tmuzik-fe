import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen.jsx";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
