import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/validURLConvert";

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);
  // console.log(allSubCategory)

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        // console.log(responseData);
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });

      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
    // console.log(sub);
  }, [params, allSubCategory]);

  return (
    <section className="mt-7 lg:mt-0 sticky top-24 lg:top-20">
      <div className="container sticky mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sub category */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll lg:py-4 p-2 flex flex-col gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCategory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link
              to={link}
              key={s._id+index+"displaySubCategory"}
                className={`w-full p-2 ${
                  subCategoryId === s._id
                    ? "bg-green-300"
                    : "hover:bg-slate-200 "
                } lg:flex items-center hover:cursor-pointer lg:w-full lg:min-h-24 box-border border-b border-gray-300 border-opacity-50 transition-colors duration-300`}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 rounded box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className="w-14 lg:w-12 lg:h-18 text-center h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 leading-none text-center lg:text-lg lg:text-left">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Product */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-4 gap-4 justify-items-center lg:justify-items-start">
              {data.map((p, index) => {
                return (
                  <CardProduct
                    data={p}
                    key={p._id + "productSubCategory" + index}
                  />
                );
              })}
            </div>
          </div>

          <div>{loading && <Loading />}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
