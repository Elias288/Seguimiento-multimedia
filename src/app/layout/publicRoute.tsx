import { useMediaContext } from "@/context/mediaContext";
import { Navigate, Outlet } from "react-router";
import Footer from "./footer";

const PublicRoute = () => {
  const { data } = useMediaContext();

  if (data) return <Navigate to="/home" />;
  return (
    <div className="h-screen min-w-screenMinWidth flex flex-col">
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicRoute;
