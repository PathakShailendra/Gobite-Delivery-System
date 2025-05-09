import React, { useEffect, useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  // console.log(location)
  useEffect(() => {
    if(!location?.state?.email) {
        navigate("/forgot-password")
    }
  }, [])

  const validateValue = data.every((value) => value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp : data.join(""),
          email : location?.state?.email
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state : {
            data : response.data,
            email : location?.state?.email
          }
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
          Enter your <span className="text-[#D69CAA]">otp</span> ✉️
        </p>

        <form onSubmit={handleSubmit} action="" className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter otp:</label>
            <div className="flex items-center gap-2 justify-between mt-3 lg:pr-28 lg:pl-0">
              {data.map((e, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);
                      if(value && value.length < 5) {
                        inputRef.current[index + 1]?.focus();
                      }
                    }}
                    maxLength={1}
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref
                    }}
                    name="otp"
                    className="bg-blue-50 p-2 w-full max-w-10 border rounded-md outline-none focus:border-[#D69CAA] text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`${
              validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  my-3 font-semibold text-white p-2 rounded-md tracking-wide`}
          >
            Verify otp
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

export default OtpVerification;
