import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setopenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="mt-8 lg:mt-0">
      {/* Profile upload and display image */}
      <div className="w-20 h-20  flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegCircleUser size={65} />
        )}
      </div>
      <button
        onClick={() => setopenProfileAvatarEdit(true)}
        className="text-xs font-semibold border border-[#68AB95] px-4 py-2 rounded-full mt-5 
  text-[#68AB95] transition-all duration-300 ease-in-out 
  hover:bg-[#68AB95] hover:text-white hover:shadow-lg 
  active:scale-95 active:bg-[#D69CAA]"
      >
        Change Profile
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setopenProfileAvatarEdit(false)} />
      )}

      {/* name, mobile, email, changePassword */}
      <form className="my-6 grid gap-5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Update Your Details
        </h2>

        <div className="grid">
          <label htmlFor="name" className="font-medium text-gray-600">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="p-3 bg-gray-100 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69CAA] transition-all"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="email" className="font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="p-3 bg-gray-100 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69CAA] transition-all"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="mobile" className="font-medium text-gray-600">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-3 bg-gray-100 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D69CAA] transition-all"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="mt-4 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#D69CAA] to-[#C08497] rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:from-[#68AB95] hover:to-[#4C9C84] hover:shadow-xl active:scale-95">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
