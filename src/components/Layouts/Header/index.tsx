import Logo from "../../../assets/crossmark-logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-white p-4 shadow-md shadow-gray-200 z-50	fixed left-0 top-0 w-full px-4 flex flex-row items-center">
        <img src={Logo} alt="" title="" width="200" className="invert" />
        <ul className="flex flex-row px-5 items-center">
          <li className="mx-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-400 rounded text-white px-2 py-2"
                  : "hover:bg-blue-400 hover:rounded bg-transparent hover:text-white px-2 py-2"
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mx-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-400 rounded text-white px-2 py-2"
                  : "hover:bg-blue-400 hover:rounded bg-transparent hover:text-white px-2 py-2"
              }
              end
            >
              FileMappings
            </NavLink>
          </li>
          <li className="mx-1">
            <NavLink
              to="/template"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-400 rounded text-white px-2 py-2"
                  : "hover:bg-blue-400 hover:rounded bg-transparent hover:text-white px-2 py-2"
              }
              end
            >
              Template
            </NavLink>
          </li>
          <li className="mx-1">
            <NavLink
              to="/administration"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-400 rounded text-white px-2 py-2"
                  : "hover:bg-blue-400 hover:rounded bg-transparent hover:text-white px-2 py-2"
              }
              end
            >
              Administration
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
