import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setdata] = useState({
    name: "",
    image: "",
  });
  const [loading, setloading] = useState(false);
  const [imageLoading, setimageLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
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
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return;
      }

      const response = await uploadImage(file);
      const { data: ImageResponse } = response;

      setdata((prev) => {
        return {
          ...prev,
          image: ImageResponse.data.url,
        };
      });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setimageLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button
            onClick={close}
            className="w-fit block ml-auto p-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-200/50 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <IoClose
              size={25}
              className="text-gray-700 transition-colors duration-300 hover:text-red-500"
            />
          </button>
        </div>

        <form className="my-3 grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="catrgoryName">Name</label>
            <input
              type="text"
              id="catrgoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:bg-[#68AB95]] outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-3 flex-col lg:flow-row">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded ">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500 ">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
    relative w-fit px-4 py-1.5 text-sm font-medium rounded-full overflow-hidden shadow-md transition-all duration-300 ease-in-out
    ${
      !data.name
        ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 shadow-none"
        : "text-white bg-gradient-to-r from-[#D69CAA] to-[#68AB95] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white/20 before:transition-all before:duration-500 before:ease-out hover:before:w-full hover:shadow-lg active:scale-95 cursor-pointer select-none"
    }
  `}
                >
                  {imageLoading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`
    relative w-full px-6 py-2.5 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-out
    ${
      data.name && data.image
        ? "bg-[#D69CAA] text-white hover:bg-[#68AB95] hover:text-black hover:shadow-lg active:scale-95 cursor-pointer select-none"
        : "bg-[#A1A8B5] text-gray-800 opacity-80 cursor-not-allowed"
    }
  `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
