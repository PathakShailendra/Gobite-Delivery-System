import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [showPasword, setshowPasword] = useState(false);
    const [showConfirmPasssword, setshowConfirmPasssword] = useState(false);
    const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    if(data.password !== data.confirmPassword) {
        toast.error("password and confirm password must be the same");
        return;
    }

    try {
        const response = await Axios({
            ...SummaryApi.register,
            data: data
        })
        if(response.data.error) {
            toast.error(response.data.message);
        }
        if(response.data.success) {
            toast.success(response.data.message);
            setData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            navigate("/login");
        }
        console.log(response);
        
    } catch (error) {
        AxiosToastError(error);
    }

  };


  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-4xl font-extrabold text-[#67AB95] text-center mt-6">
          Welcome to <span className="text-[#D69CAA]">GoBite</span> 🍽️
        </p>

        <form onSubmit={handleSubmit} action="" className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-blue-50 p-2 border rounded-md outline-none focus:border-[#D69CAA]"
            />
          </div>

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

          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-[#D69CAA]">
              <input
                type={showPasword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                type={showConfirmPasssword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirm password"
                className="w-full outline-none"
              />
              <div
                onClick={() => {
                  setshowConfirmPasssword((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                {showConfirmPasssword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
          disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  my-3 font-semibold text-white p-2 rounded-md tracking-wide`}
          >
            Register
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

export default Register;
