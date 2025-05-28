import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  if (!user)
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;

  return children;
};

export default PrivateRouter;
