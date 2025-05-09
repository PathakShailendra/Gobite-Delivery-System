import React from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const ViewImageSubCategory = ({ data, close }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-2xl max-h-[90vh] p-6 bg-white rounded-lg shadow-2xl transform transition-all"
      >
        <button
          onClick={close}
          className="w-fit block ml-auto p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300/50 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
        >
          <IoClose
            size={28}
            className="text-gray-700 transition-colors duration-300 hover:text-red-500"
          />
        </button>
        <div className="flex flex-col items-center space-y-4">
          <motion.img
            src={data.image}
            alt={data.name}
            className="w-64 h-64 object-contain rounded-lg border border-gray-300 shadow-md"
            whileHover={{ scale: 1.05 }}
          />
          <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {data.category.map((c) => (
              <motion.span
                key={c._id}
                className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-200 hover:shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {c.name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewImageSubCategory;
