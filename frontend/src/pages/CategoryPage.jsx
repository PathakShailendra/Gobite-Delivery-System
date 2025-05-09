import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import CofirmBox from "../components/ConfirmBox";
import { all } from "axios";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setopenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  // const allCategory = useSelector((state) => state.product.allCategory);

  // useEffect(() => {
  //   setcategoryData(allCategory);
  // }, [allCategory]);


  const fetchCategory = async () => {
    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setcategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setopenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Update Category</h2>
        <button
          onClick={() => setopenUploadCategory(true)}
          className="text-xs font-semibold border border-[#68AB95] px-4 py-2 rounded-full mt-5 
  text-[#68AB95] transition-all duration-300 ease-in-out 
  hover:bg-[#68AB95] hover:text-white hover:shadow-lg 
  active:scale-95 active:bg-[#D69CAA]"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-hidden">
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="w-40 h-64 rounded-lg shadow-md overflow-hidden bg-white transition-transform duration-300 hover:scale-102 hover:shadow-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              {/* <p className="text-center text-sm font-semibold text-gray-700 mt-2">
                {category.name}
              </p> */}

              {/* Styled Button Section */}
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="px-3 py-1 text-sm font-medium text-white bg-[#68AB95] rounded-md shadow-md transition-all duration-300 hover:bg-[#4F8273] hover:shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setopenConfirmBoxDelete(true);
                    setDeleteCategory(category)
                  }}
                  className="px-3 py-1 text-sm font-medium text-white bg-[#D69CAA] rounded-md shadow-md transition-all duration-300 hover:bg-[#AD6F83] hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setopenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setopenConfirmBoxDelete(false)}
          cancel={() => setopenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;

