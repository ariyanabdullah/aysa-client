import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import { authContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);

  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace>
      {" "}
    </Navigate>
  );
};

export default PrivateRoute;
