import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data, variant = "default" }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemsDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkingitem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailableCart(checkingitem);

    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
    setCartItemsDetails(product);
  }, [data, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (response.success) {
      toast.success("Item added");
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);

      if (response.success) {
        toast.success("Item removed");
      }
    }
  };

  return (
    <div className="w-full h-full">
      {isAvailableCart ? (
        <div
          className={`flex items-center justify-between gap-1 bg-green-100 px-3 py-0 rounded-md shadow-sm h-full
          ${variant === "card" ? "w-[70px]" : "w-full"}`}
        >
          <button
            onClick={decreaseQty}
            className={`bg-green-600 -ml-[10px] hover:bg-green-700 text-white flex items-center justify-center rounded-full transition duration-200
              ${variant === "card" ? "w-5 h-5 aspect-square" : "w-8 h-8"}
`}
          >
            <FaMinus size={variant === "card" ? 12 : 14} />
          </button>
          <span
            className={`font-semibold text-gray-800 text-center ${
              variant === "card"
                ? "text-xs min-w-[20px]"
                : "text-sm min-w-[24px]"
            }`}
          >
            {qty}
          </span>
          <button
            onClick={increaseQty}
            className={`bg-green-600 hover:bg-green-700 text-white flex items-center justify-center rounded-full transition duration-200
              ${variant === "card" ? "w-5 h-5 aspect-square" : "w-8 h-8"}
`}
          >
            <FaPlus size={variant === "card" ? 12 : 12} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white w-full h-full rounded-md shadow-md transition-all duration-300 transform hover:scale-105 text-sm flex justify-center items-center"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
