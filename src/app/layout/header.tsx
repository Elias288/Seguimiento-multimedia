import { NavLink } from "react-router";

type Props = {};
const Header = ({}: Props) => {
  return (
    <header className="bg-principal py-2 px-4 font-bold sticky top-0 flex items-center justify-between">
      <h1 className="text-2xl">Seguimiento Multimedia</h1>

      <nav className="flex gap-2.5">
        <NavLink to={"/home"} className="hover:opacity-70">
          Home
        </NavLink>
        <NavLink to="/info" className="hover:opacity-70">
          Info
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
