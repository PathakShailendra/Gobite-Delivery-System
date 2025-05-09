import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleuploadAvatarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(17,17,17,0.3)] p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-800 w-fit block ml-auto"
        >
          <IoClose size={20} />
        </button>
        <div className="w-20 h-20 mb-5 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full" />
          ) : (
            <FaRegCircleUser size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div
              className="relative px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-[#D69CAA] to-[#68AB95] 
  rounded-full overflow-hidden shadow-md transition-all duration-300 ease-in-out 
  before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white/20 
  before:transition-all before:duration-500 before:ease-out 
  hover:before:w-full hover:shadow-lg active:scale-95 cursor-pointer"
            >
              {loading ? "Loading..." : "upload"}
            </div>
          </label>
          <input
            onChange={handleuploadAvatarImage}
            type="file"
            id="uploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
