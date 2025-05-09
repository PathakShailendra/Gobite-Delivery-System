import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validateValue = Object.values(data).every((value) => value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verification", {
          state : data
        });
        setData({
          email: "",
        });
        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-3xl font-bold text-[#67AB95] text-center mt-6">
          Enter your <span className="text-[#D69CAA]">email</span> to receive
          OTP ✉️
        </p>

        <form onSubmit={handleSubmit} action="" className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-blue-50 p-2 border rounded-md outline-none focus:border-[#D69CAA]"
            />
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  my-3 font-semibold text-white p-2 rounded-md tracking-wide`}
          >
            Send otp
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

export default ForgotPassword;

