import React from "react";
import { IoCart } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky mb-2 w-full px-2 z-50">
          <div className="bg-green-600 text-white rounded-lg py-2 px-4 shadow-lg flex items-center justify-between gap-4 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="bg-green-800 p-2 rounded-full flex items-center justify-center">
                <IoCart className="text-xl" />
              </div>
              <div className="text-sm leading-tight">
                <p className="font-semibold">{totalQty} items</p>
                <p className="text-xs text-white/80">{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>

            <Link
              to="/cart"
              className="bg-white text-green-700 text-sm font-medium px-4 py-1.5 rounded-md flex items-center gap-2 transition-all active:scale-[0.97]"
            >
              <span>View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
