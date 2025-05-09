import React, { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import CofirmBox from "./ConfirmBox";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

    const handleDelete = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.deleteProduct,
          data: {
            _id: data._id,
          },
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);
          if (fetchProductData) {
            fetchProductData();
          }
          setOpenDelete(false);
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };
  
  return (
    <div
    className={`w-40 h-64 rounded-lg shadow-md overflow-hidden bg-white transition-transform duration-300 flex flex-col justify-between ${
      !editOpen && !openDelete ? "hover:scale-105 hover:shadow-lg" : ""
    }`}
    >
      {/* Image Section */}
      <div className="w-full h-48 flex items-center justify-center overflow-hidden">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name & Unit */}
      <div className="px-2 grid gap-2">
        <p className="text-sm text-center font-semibold text-gray-700 line-clamp-2">
          {data?.name}
        </p>
        <p className="text-sm text-center text-gray-600 font-medium mt-1">
          {data?.unit}
        </p>{" "}
        {/* Increased Font Size & Left Align */}
      </div>

      {/* Styled Button Section */}
      <div className="flex justify-center gap-3 pb-3 mt-3">
        <button
          onClick={() => setEditOpen(true)}
          className="px-3 py-1 text-sm font-medium text-white bg-[#68AB95] rounded-md shadow-md transition-all duration-300 hover:bg-[#4F8273] hover:shadow-lg"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="px-3 py-1 text-sm font-medium text-white bg-[#D69CAA] rounded-md shadow-md transition-all duration-300 hover:bg-[#AD6F83] hover:shadow-lg"
        >
          Delete
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {openDelete && (
        <section className="fixed inset-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center animate-fadeIn">
          <div className="bg-white w-full max-w-md p-5 rounded-lg shadow-lg animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                Permanent Delete
              </h3>
              <button
                onClick={() => setOpenDelete(false)}
                className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 active:scale-90"
              >
                <IoClose
                  size={25}
                  className="text-gray-700 hover:text-red-500 transition-colors"
                />
              </button>
            </div>

            {/* Message */}
            <p className="my-5 text-gray-700 text-base">
              Are you sure you want to delete permanently?
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDeleteCancel}
                className="px-5 py-2 border rounded border-[#D69CAA] text-[#D69CAA] font-medium transition-all duration-300 hover:bg-[#D69CAA] hover:text-white hover:shadow-md active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 border rounded border-[#68AB95] text-[#68AB95] font-medium transition-all duration-300 hover:bg-[#68AB95] hover:text-white hover:shadow-md active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductCardAdmin;


// video 5:18 ghante ki ho gyi he aur abhi tak hamne edit aur delete the feature add kar diya he product ke liye
// ab ham aage product ka liye kaam karenge