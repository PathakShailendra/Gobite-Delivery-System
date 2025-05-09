import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });

  console.log(subCategoryData);

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubcategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if(fetchData){
          fetchData();
          }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
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
        <form onSubmit={handleSubmitSubcategory} className="my-3 grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              type="text"
              className="p-3 bg-blue-50 border outline-none focus-within:border-[#D69CAA] rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center ">
                {!subCategoryData.image ? (
                  <p className="text-sm text-neutral-400">No image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="Sub Category"
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div
                  className="
    relative w-fit px-4 py-1.5 text-sm font-medium rounded-full overflow-hidden shadow-md transition-all duration-300 ease-in-out border border-[#D69CAA]
    text-white bg-gradient-to-r from-[#D69CAA] to-[#68AB95] 
    before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white/20 
    before:transition-all before:duration-500 before:ease-out 
    hover:before:w-full hover:shadow-lg active:scale-95 cursor-pointer select-none
  "
                >
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>
            <div className="border focus-within:border-[#D69CAA] rounded">
              {/* Display value */}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>

              {/* Select Category */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );

                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
                className="w-full p-2 bg-transparent outline-none"
              >
                <option value={""}>Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + "subcategory"}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
  className={`px-4 py-2 border rounded-lg font-semibold transition-all duration-300 ease-in-out
              ${
                subCategoryData?.name &&
                subCategoryData?.image &&
                subCategoryData?.category[0]
                  ? "bg-[#D69CAA] text-white hover:bg-[#c47789] active:scale-105 shadow-md hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
  disabled={!(subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0])}
>
  Submit
</button>

        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;


