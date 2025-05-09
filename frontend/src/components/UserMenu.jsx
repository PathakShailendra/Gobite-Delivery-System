import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiExternalLink } from "react-icons/fi";
import isAdmin from "../utils/IsAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    if (close) {
      close();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="text-gray-800">
      <div className="font-semibold text-lg">My Account</div>
      <div className="text-sm text-gray-600 mt-1 flex items-center gap-3">
        <span className="max-w-52 truncate flex items-center space-x-1">
          <span className="text-md font-medium">
            {user.name || user.mobile}
          </span>
          {user.role === "ADMIN" && (
            <span className="text-md text-[#D69CAA] font-semibold">
              (Admin)
            </span>
          )}
        </span>

        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-[#D69CAA]"
        >
          <FiExternalLink size={17} />
        </Link>
      </div>

      <Divider />

      <div className="grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
          >
            Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
          >
            SubCategory
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
          >
            Upload Products
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
          >
            Products
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
        >
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
        >
          Save Addresses
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-2 py-2 rounded-md text-red-600 font-medium transition-all duration-200 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
