import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";
const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;
      // console.log(responseData)
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  // console.log(data);

  return (
    <section className="container mx-auto mt-4 p-4 grid lg:grid-cols-2 gap-4">
      {/* first */}
      <div>
        {/* Main Image */}
        <div className="lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-52 max-h-52 h-full w-full">
          <img
            src={data.image[image]}
            alt=""
            className="w-full h-full object-scale-down"
          />
        </div>

        {/* Image Indicator Dots */}
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => (
            <div
              key={img + index + "point"}
              className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                index === image && "bg-slate-400"
              }`}
            ></div>
          ))}
        </div>

        {/* Horizontal Image Scroll */}
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none items-center"
          >
            {data.image.map((img, index) => (
              <div
                className="w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md"
                key={img + index}
              >
                <img
                  src={img}
                  alt="min-product"
                  onClick={() => setImage(index)}
                  className="w-full h-full object-scale-down"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="w-full flex justify-between absolute h-full items-center -ml-7">
            <button
              className="z-10 bg-white p-1 rounded-full shadow-lg"
              onClick={handleScrollLeft}
            >
              <FaAngleLeft />
            </button>
            <button
              className="z-10 bg-white p-1 rounded-full shadow-lg"
              onClick={handleScrollRight}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Description & Details */}
        <div className="my-4 grid gap-2 lg:gap-4">
          {/* Mobile View - Accordion Style */}
          <div className="lg:hidden">
            <details className="mb-2">
              <summary className="font-semibold cursor-pointer">
                Description
              </summary>
              <p className="text-sm mt-1">{data.description}</p>
            </details>
            <details className="mb-2">
              <summary className="font-semibold cursor-pointer">Unit</summary>
              <p className="text-sm mt-1">{data.unit}</p>
            </details>
            {data?.more_details &&
              Object.keys(data?.more_details).map((element, index) => (
                <details key={index} className="mb-2">
                  <summary className="font-semibold cursor-pointer">
                    {element}
                  </summary>
                  <p className="text-sm mt-1">{data?.more_details[element]}</p>
                </details>
              ))}
          </div>

          {/* Desktop View - Normal View */}
          <div className="hidden lg:grid gap-2">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-sm">{data.description}</p>
            </div>
            <div>
              <p className="font-semibold">Unit</p>
              <p className="text-sm">{data.unit}</p>
            </div>
            {data?.more_details &&
              Object.keys(data?.more_details).map((element, index) => (
                <div key={index}>
                  <p className="font-semibold">{element}</p>
                  <p className="text-sm">{data?.more_details[element]}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* second */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 py-1 rounded-full mb-2 text-sm lg:text-base">
          10 min
        </p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{data.unit}</p>

        <Divider className="my-2" />

        {/* Price Section */}
        <div>
          <p className="font-semibold mb-1">Price</p>
          <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
            <div className="border border-green-600 px-4 py-1 lg:py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount > 0 && (
              <>
                <p className="text-base lg:text-lg font-semibold text-gray-500 line-through">
                  {DisplayPriceInRupees(data.price)}
                </p>
                <p className="font-bold text-green-600 text-base lg:text-xl">
                  {data.discount}%{" "}
                  <span className="text-sm text-neutral-500">Discount</span>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Stock Check */}
        {data.stock === 0 ? (
          <p className="text-base font-semibold my-4 text-red-500">
            Out of Stock
          </p>
        ) : (
          // <button className="my-4 px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded shadow-md transition-all duration-300">
          //   Add to Cart
          // </button>
          <div className="h-12 w-32 mt-4">
            <AddToCartButton data={data} />
          </div>
        )}

        {/* Why shop from GoBite */}
        <h2 className="font-semibold mt-4 mb-2">Why shop from GoBite?</h2>
        <div>
          <div className="flex items-start gap-4 mb-4">
            <img
              src={image1}
              alt="super fast delivery"
              className="w-16 h-16 lg:w-20 lg:h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <img
              src={image2}
              alt="Best price offers"
              className="w-16 h-16 lg:w-20 lg:h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Best Price & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufacturers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <img
              src={image3}
              alt="Wide Assortment"
              className="w-16 h-16 lg:w-20 lg:h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food, personal care, household
                & more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
