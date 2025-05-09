import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/IsAdmin";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-red-600 bg-red-100 p-4">Only Admin user has permission</p>
      )}
    </>
  );
};

export default AdminPermission;
