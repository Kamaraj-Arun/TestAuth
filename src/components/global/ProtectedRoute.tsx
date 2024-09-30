import React from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const token = sessionStorage.getItem("token"); // Adjust according to your token storage method
  const location = useLocation();

  console.log("loca", location);

  if (!token) {
    // Optionally, you can redirect to a login page or show a notification
    // Redirect back to the same location after login by passing state
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  // if (token && location.pathname === "/sell") {
  //   toast.error("Please click the sell in menu");
  //   return <Navigate to={"/"} state={{ from: location }} />;
  // }
  return children;
};

export default ProtectedRoute;
