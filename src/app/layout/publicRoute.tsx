import { useMediaContext } from "@/context/mediaContext";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { data } = useMediaContext();

  if (data) return <Navigate to="/home" />;
  return <Outlet />;
};

export default PublicRoute;
