import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70 flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white">
        <button
          onClick={close}
          className="w-fit block ml-auto p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300/50 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
        >
          <IoClose
            size={28}
            className="text-gray-700 transition-colors duration-300 hover:text-red-500"
          />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
};

export default ViewImage;
