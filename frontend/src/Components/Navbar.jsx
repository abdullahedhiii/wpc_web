import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useModuleContext } from "../contexts/ModuleContext";

const Navbar = ({ isOpen, isLogo, closeSideBar, closeLogo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, user } = useSelector((state) => state.user);
  const { selectedModule } = useModuleContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSideBarClose = () => {
    closeSideBar(!isOpen);
    if (window.innerWidth >= 1024) closeLogo(!isLogo);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (location.pathname === "/" || location.pathname === "/register") {
    return (
      <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50 h-24">
        <div className="ml-28 h-full flex items-center px-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 h-auto transition-all duration-200"
          />
        </div>
      </nav>
    );
  } else if (location.pathname === "/employeeDashboard") {
    return (
      <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50 h-28">
        <div className="h-auto flex items-center justify-between px-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-44 h-auto transition-all duration-200"
          />

          <div className="flex items-center space-x-4 mr-10">
            <div className="text-left">
              <p className="font-bold text-2xl">{user.first_name + " " + user.last_name}</p>
              <p className="text-gray-600 text-xl">{user.email}</p>
              <p className="text-gray-600 text-xl">{user.phone_number}</p>
            </div>
            <button onClick={handleLogout} title="Logout">
              <i className="la la-power-off text-4xl text-red-600"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50 h-16">
      <div className="h-full flex items-center px-4">
        {isMobile ? (
          <>
            <div className="flex items-center">
              <button
                onClick={handleSideBarClose}
                className="text-tt hover:text-blue-800"
                title="Toggle Sidebar"
              >
                <i className="la la-bars text-4xl"></i>
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-28 h-auto transition-all duration-200"
              />
            </div>

            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="text-tt hover:text-blue-800"
                title="Options"
              >
                <i className="la la-ellipsis-v text-4xl"></i>
              </button>

              {menuOpen && (
                <div className="absolute right-4 top-[72px] bg-white shadow-md rounded-lg p-2 space-y-2">
                  {isLoggedIn && (
                    <>
                      <button
                        onClick={() => navigate("/employeeDashboard")}
                        className="block text-gray-800 hover:bg-gray-200 p-2 rounded-md w-full text-left"
                        title="Main Dashboard"
                      >
                        <i className="la la-home"></i> Dashboard
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/hrms/${selectedModule.next_route}`)
                        }
                        className="block text-gray-800 hover:bg-gray-200 p-2 rounded-md w-full text-left"
                        title="HRMS"
                      >
                        <img
                          src="/images/dashboard.png"
                          alt="Dashboard Icon"
                          className="inline w-5 h-5 mr-2"
                        />{" "}
                        HRMS
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block text-gray-800 hover:bg-gray-200 p-2 rounded-md w-full text-left"
                        title="Logout"
                      >
                        <i className="la la-key"></i> Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              {(isLogo || location.pathname === "/employeeDashboard") && (
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-24 h-auto transition-all duration-200"
                />
              )}
              {isLoggedIn && location.pathname !== "/employeeDashboard" && (
                <button
                  onClick={handleSideBarClose}
                  className="text-tt hover:text-blue-800"
                  title="Toggle Sidebar"
                >
                  {isLogo ? (
                    <i className="ml-20 fas fa-bars font-extrabold text-2xl"></i>
                  ) : (
                    <i className="fa-solid fa-ellipsis-v  text-2xl text-tt ml-6"></i>
                  )}
                </button>
              )}
            </div>

            {isLoggedIn ? (
              <div className="ml-auto flex items-center space-x-4 mr-10">
                <button
                  onClick={() => navigate("/employeeDashboard")}
                  className="text-tt"
                  title="Main Dashboard"
                >
                  <i className="la la-home text-2xl"></i>
                </button>
                {selectedModule.name !== "Organisation Profile" && <button
                  onClick={() => navigate(`/hrms/${selectedModule.next_route}`)}
                  title="HRMS"
                >
                  <img
                    src="/images/dashboard.png"
                    alt="Dashboard Icon"
                    className="w-5 h-5"
                  />
                </button>}
                <button onClick={handleLogout} title="Logout">
                  <i className="la la-key text-2xl text-tt"></i>
                </button>
              </div>
            ) : undefined}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
