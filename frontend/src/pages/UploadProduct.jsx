import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AddFieldComponent from "../components/AddFieldComponent";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
  const [data, setdata] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    publish: true,
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setselectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  // console.log(allSubCategory)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: imageResponse } = response;

    const imageUrl = imageResponse.data.url;
    setdata((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setdata((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddField = () => {
    setdata((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setdata({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "", 
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="mt-5 lg:mt-0">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-4">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>
          <div>
            <p className="font-semibold">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center space-y-1">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>upload image</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>

              {/* display uploaded images */}
              <div className="flex flex-wrap gap-4">
                {data.image.map((image, index) => {
                  return (
                    <div
                      key={image + index}
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={image}
                        alt={image}
                        className="w-full h-full object-scale-down cursor-pointer"
                        onClick={() => setViewImageUrl(image)}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-[2px] right-[2px] p-1 bg-red-600 hover:bg-red-800 rounded-full text-white hidden group-hover:block cursor-pointer"
                      >
                        <MdDelete size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-semibold">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((c) => c._id === value);
                  setdata((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category],
                    };
                  });
                  setselectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((c, index) => {
                  return (
                    <option key={c._id} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-1 flex flex-wrap gap-2">
                {data.category.map((c, index) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-100 px-3 py-1.5 flex items-center rounded-lg shadow-md hover:shadow-lg transition-all inline-flex"
                  >
                    <p className="text-gray-800 font-medium">{c.name}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        data.category.splice(index, 1);
                        setdata((prev) => ({
                          ...prev,
                        }));
                      }}
                      className="bg-red-600 ml-2 p-1.5 rounded-full text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <MdDelete size={18} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-semibold">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                name=""
                id=""
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (c) => c._id === value
                  );
                  setdata((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allSubCategory.map((c, index) => {
                  return (
                    <option key={c._id} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="mt-1 flex flex-wrap gap-2">
                {data.subCategory.map((c, index) => (
                  <motion.div
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-100 px-3 py-1.5 flex items-center rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <p className="text-gray-800 font-medium">{c.name}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        data.subCategory.splice(index, 1);
                        setdata((prev) => ({
                          ...prev,
                        }));
                      }}
                      className="bg-red-600 ml-2 p-1.5 rounded-full text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <MdDelete size={18} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="unit">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              id="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
            />
          </div>
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="stock">
              Stock quantity
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
            />
          </div>
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
            />
          </div>
          <div className="grid gap-1">
            <label className="font-semibold" htmlFor="discount">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
            />
          </div>

          {/* Add more fields */}
          {Object.keys(data.more_details)?.map((key, index) => {
            return (
              <div className="grid gap-1">
                <label className="font-semibold" htmlFor={key}>
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  value={data?.more_details[key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setdata((prev) => {
                      return {
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [key]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-[#D69CAA] rounded"
                />
              </div>
            );
          })}
          <div
            onClick={() => setOpenAddField(true)}
            className="inline-block w-31 mt-4 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#D69CAA] to-[#C08497] rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:from-[#68AB95] hover:to-[#4C9C84] hover:shadow-xl active:scale-95 cursor-pointer"
          >
            Add Fields
          </div>
          <button
            type="submit"
            className="relative px-7 py-3 text-white font-semibold rounded-lg shadow-md 
             bg-[#D69CAA] transition-all duration-300 
             hover:bg-[#68AB95] hover:shadow-lg active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>

      {ViewImageUrl && (
        <ViewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
      )}

      {openAddField && (
        <AddFieldComponent
          close={() => setOpenAddField(false)}
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
        />
      )}
    </section>
  );
};

export default UploadProduct;



// Abhi mene bas aata product ko add kar diya he as demo aur pure products ko add karna baki he ab bethker sare products ko add karna he but abhi me aage badha rha hu
// besan sooji and maida bhi add kar diya he
// ab apan sari main categories me se 1-1 product add kar denge wo kafi hoga abhi tak aata rice & dal add kar diya he