import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/validURLConvert";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="relative border rounded-lg shadow-md my-1 bg-white transition-all duration-300 transform hover:scale-102 hover:shadow-lg flex flex-col p-2 lg:p-3 gap-2 w-40 lg:min-w-44"
    >
      {/* Image Container */}
      <div className="min-h-24 max-h-24 lg:max-h-32 rounded overflow-hidden flex items-center justify-center">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down"
          alt="Product"
        />
      </div>

      {/* Out of Stock Message (moved above name) */}
      {data.stock <= 0 && (
        <span className="text-red-600 text-sm font-semibold px-2 lg:px-0">
          Out of Stock
        </span>
      )}

      {/* Product Name */}
      <div className="px-2 lg:px-0 font-medium text-sm lg:text-base text-ellipsis line-clamp-2 text-gray-800">
        {data.name}
      </div>

      {/* Unit + Discount Badge */}
      <div className="px-2 lg:px-0 flex items-center justify-between">
        <div className="text-xs lg:text-sm text-gray-600">{data.unit}</div>
        {data.discount > 0 && (
          <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
            {data.discount}% Off
          </div>
        )}
      </div>

      {/* Price & Add Button */}
      <div className="px-2 lg:px-0 flex items-center justify-between gap-2 text-xs lg:text-sm">
        {/* Price */}
        <div className="flex flex-col">
          <span className="font-semibold text-black text-sm lg:text-base">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </span>
          {data.discount > 0 && (
            <span className="text-gray-500 line-through text-xs">
              {DisplayPriceInRupees(data.price)}
            </span>
          )}
        </div>

        {/* Add Button */}
        {data.stock > 0 && (
          <div className="h-8 w-16">
            <AddToCartButton data={data} variant="card" />
          </div>
        )}
      </div>

      {/* Time Badge */}
      <div className="absolute top-2 left-2 rounded-full p-1 w-fit text-xs px-2 text-green-600 bg-green-100">
        10 min
      </div>
    </Link>
  );
};

export default CardProduct;
