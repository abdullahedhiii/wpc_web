import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.user);
  console.log(isLoggedIn,user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="relative top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-2">
        <div className="flex-grow">
          <img src="/images/logo.png" alt="Logo" 
            className="w-24 h-auto ml-10" />
        </div>

        {isLoggedIn && user ? (
          <div className="flex items-center space-x-4 mr-10">
            <div className="text-left">
              <p className="font-bold">{user.first_name + " " + user.last_name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.phone_number}</p>
            </div>
            <button
              onClick={handleLogout}
              title="logout"
            >
             <i className="la la-power-off text-4xl text-red-400"></i>
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
