import React from "react";
import { IoClose } from "react-icons/io5";

const CofirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center animate-fadeIn">
      <div className="bg-white w-full max-w-md p-5 rounded-lg shadow-lg animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Confirm Deletion</h1>
          <button
            onClick={close}
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
          Are you sure you want to permanently delete this item?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={cancel}
            className="px-5 py-2 border rounded border-[#D69CAA] text-[#D69CAA] font-medium transition-all duration-300 hover:bg-[#D69CAA] hover:text-white hover:shadow-md active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-5 py-2 border rounded border-[#68AB95] text-[#68AB95] font-medium transition-all duration-300 hover:bg-[#68AB95] hover:text-white hover:shadow-md active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CofirmBox;
