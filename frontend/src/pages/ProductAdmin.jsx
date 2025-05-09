import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";
import EditProductAdmin from "../components/EditProductAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;
      console.log(responseData);
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className="mt-5 lg:mt-0">
      <div className="p-2  bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-32 max-w-72 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded-full border border-[#68AB95] shadow-md transition-all duration-300 focus-within:border-[#016630] focus-within:shadow-lg">
          <IoSearchOutline
            size={22}
            className="text-[#68AB95] transition-all duration-300 group-hover:scale-110"
          />
          <input
            type="text"
            placeholder="Search product here..."
            className="h-full w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return (
                <ProductCardAdmin
                  data={p}
                  fetchProductData={fetchProductData}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between my-4 gap-4">
          <button
            onClick={handlePrevious}
            className="border border-primary-200 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#68AB95] hover:text-white shadow-md hover:shadow-lg"
          >
            Previous
          </button>

          <div className="w-full text-center bg-[#069348d2] text-black py-2 rounded-lg font-semibold tracking-wide shadow-md">
            {page}/{totalPageCount}
          </div>

          <button
            onClick={handleNext}
            className="border border-[#D69CAA] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#D69CAA] hover:text-white shadow-md hover:shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
