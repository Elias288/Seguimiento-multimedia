import { Outlet, useNavigate } from "react-router";
import Header from "./header";
import { MediaProvider, useMedia } from "@/context/useMedia";
import { useEffect } from "react";

const Layout = () => {
  const { data } = useMedia();
  let navigate = useNavigate();

  useEffect(() => {
    if (!data) navigate("/");
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
