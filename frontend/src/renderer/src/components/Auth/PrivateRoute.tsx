import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@renderer/zustand/authStore";

const PrivateRoute = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
