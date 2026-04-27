import { useMedia } from "@/context/useMedia";
import Spinner from "@/icons/spinner";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { data, loaded } = useMedia();

  if (!loaded)
    return (
      <main className="h-screen flex-1 flex items-center justify-center">
        <Spinner size={100} />
      </main>
    );
  if (data) return <Navigate to="/home" />;
  return <Outlet />;
};

export default PublicRoute;
