import { Outlet } from "react-router";
import Header from "./header";

type Props = {};
const Layout = ({}: Props) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
