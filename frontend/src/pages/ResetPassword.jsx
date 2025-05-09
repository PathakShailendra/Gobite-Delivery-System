import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPasword, setshowPasword] = useState(false);
  const [showConfirmPasword, setshowConfirmPasword] = useState(false);

  const [data, setdata] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateValue = Object.values(data).every((value) => value);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setdata(() => {
        return {
          ...data,
          email: location.state.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target

    setdata((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
}

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword) {
        toast.error("Password and confirm password must be the same");
        return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword, // change
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setdata({
            email: "",
            newPassword: "",
            confirmPassword: "",
        });
      }
      console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-3xl font-bold text-[#67AB95] text-center mt-6">
          Enter your<span className="text-[#D69CAA]"> password</span> ✉️
        </p>

        <form onSubmit={handleSubmit} action="" className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="password">New Password:</label>
            <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-[#D69CAA]">
              <input
                type={showPasword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="w-full outline-none"
              />
              <div
                onClick={() => {
                  setshowPasword((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                {showPasword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-[#D69CAA]">
              <input
                type={showPasword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
                className="w-full outline-none"
              />
              <div
                onClick={() => {
                  setshowConfirmPasword((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                {showConfirmPasword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>


          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  my-3 font-semibold text-white p-2 rounded-md tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            className="font-semibold text-[#67AB95] hover:text-[#D69CAA] hover:underline transition-all duration-300"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
