import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;
