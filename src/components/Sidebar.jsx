import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./deadpool-icon.png";
import { useAuth } from "context/authContext";
import PrivateComponent from "./PrivateComponent.jsx";

const SidebarLinks = () => {
    return (
      <ul className="mt-12">
        <SidebarRoute to="" title="Inicio" icon="fas fa-home" />
        <PrivateComponent roleList={["ADMINISTRADOR"]}>
          <SidebarRoute
            to="/gestion-usuarios"
            title="Gestión de usuarios"
            icon="fas fa-users"
          />
        </PrivateComponent>
        <SidebarRoute
          to="/gestion-proyectos"
          title="Gestión de proyectos"
          icon="fas fa-project-diagram"
        />
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <SidebarRoute
          to="/gestion-inscripciones"
          title="Gestión de inscripciones"
          icon="fas fa-tasks"
        />
        </PrivateComponent>
        
        {/* <SidebarRoute
          to="/gestion-avances"
          title="Gestión de avances"
          icon="fas fa-spinner"
        /> */}
        <Logout />
      </ul>
    );
    };

    const Logout = () => {
        const { setToken } = useAuth();
        const deleteToken = () => {
        //console.log("eliminar token");
        setToken(null);
        };
        return (
        <li onClick={() => deleteToken()}>
            <NavLink to="/auth/login" className="sidebar-route text-red-700">
            <div className="flex items-center">
                <i className="fas fa-sign-out-alt" />
                <span className="text-sm  ml-2">Cerrar Sesión</span>
            </div>
            </NavLink>
        </li>
        );
    };

    const Logo = () => {
    return (
        <div className="py-3 w-full flex flex-col items-center justify-center">
        <img src={logo} alt="Logo X-Force" className="h-16" />
        <span className="my-2 text-xl font-bold text-center">
            Gestión de Proyectos X-Force
        </span>
        </div>
    );
    };

    const Sidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex flex-col md:flex-row flex-no-wrap md:h-full">
        {/* Sidebar starts */}

        <div className="sidebar hidden md:flex">
            <div className="px-8">
            <Logo />
            <SidebarLinks />
            </div>
        </div>
        <div className="flex md:hidden w-full justify-between bg-gray-100 p-2 text-white">
            <i
            className={`fas fa-${open ? "times" : "bars"}`}
            onClick={() => setOpen(!open)}
            />
            <i className="fas fa-home" />
        </div>
        {open && <ResponsiveSidebar />}
        {/* Sidebar ends */}
        </div>
    );
    };

    const ResponsiveSidebar = () => {
    return (
        <div>
        <div
            className="sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out"
            id="mobile-nav"
        >
            <div className="px-8">
            <Logo />
            <SidebarLinks />
            </div>
        </div>
        </div>
    );
    };

    const SidebarRoute = ({ to, title, icon }) => {
    return (
        <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
            isActive
                ? "sidebar-route text-white bg-blue"
                : "sidebar-route text-gray-500 hover:text-white hover:bg-gray-200"
            }
        >
            <div className="flex items-center">
            <i className={icon} />
            <span className="text-sm  ml-2">{title}</span>
            </div>
        </NavLink>
        </li>
    );
};

export default Sidebar;
