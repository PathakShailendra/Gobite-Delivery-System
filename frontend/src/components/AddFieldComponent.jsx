import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Field</h1>
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
        <input
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-[#D69CAA] rounded w-full "
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="text-xs w-fit block mx-auto font-semibold border border-[#68AB95] px-7 py-3 rounded-full mt-3 
  text-[#68AB95] transition-all duration-300 ease-in-out 
  hover:bg-[#68AB95] hover:text-white hover:shadow-lg 
  active:scale-95 active:bg-[#D69CAA]"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
