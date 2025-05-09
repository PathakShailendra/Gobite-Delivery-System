import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast.error("Please login first");
  };

  return (
    <section className="bg-neutral-900/70 fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="bg-white w-full max-w-sm lg:max-w-md min-h-screen max-h-screen ml-auto">
        <div className="flex items-center justify-between p-2 shadow-md">
          <h2 className="font-semibold text-base lg:text-lg">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={24} />
          </Link>
          <button
            onClick={close}
            className="w-fit ml-auto p-1.5 hidden lg:block rounded-full transition-all duration-300 ease-in-out hover:bg-gray-200/50 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <IoClose size={22} className="text-gray-700 hover:text-red-500" />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-3 lg:p-4 flex flex-col gap-3 lg:gap-4">
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-xl shadow-sm text-sm font-medium">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-xl p-3 grid gap-4 overflow-auto shadow-md">
                {cartItem.map((item) => {
                  return (
                    <div
                      key={item?._id + "cartItemDisplay"}
                      className="flex items-center w-full gap-3"
                    >
                      <div className="w-14 h-14 min-w-14 min-h-14 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center shadow-sm bg-white">
                        <img
                          src={item?.productId?.image[0]}
                          className="object-contain h-full w-full"
                        />
                      </div>

                      <div className="w-full max-w-sm text-xs space-y-1">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item?.productId?.name}
                        </p>
                        <p className="text-neutral-400 text-xs">
                          {item?.productId?.unit}
                        </p>
                        <p className="font-semibold text-green-700">
                          {DisplayPriceInRupees(
                            pricewithDiscount(
                              item?.productId?.price,
                              item?.productId?.discount
                            )
                          )}
                        </p>
                      </div>

                      <div className="h-8 ml-auto">
                        <AddToCartButton
                          variant={"card"}
                          data={item?.productId}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white p-3 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-sm mb-3 text-gray-700">
                  Bill Details
                </h3>

                <div className="flex justify-between items-center mb-2 text-xs">
                  <p className="text-gray-600">Items Total</p>
                  <p className="flex items-center gap-1">
                    <span className="line-through text-neutral-400 text-xs">
                      {DisplayPriceInRupees(notDiscountTotalPrice)}
                    </span>
                    <span className="font-medium text-gray-800 text-xs">
                      {DisplayPriceInRupees(totalPrice)}
                    </span>
                  </p>
                </div>

                <div className="flex justify-between items-center mb-2 text-xs">
                  <p className="text-gray-600">Quantity Total</p>
                  <p className="font-medium text-gray-800">{totalQty} item</p>
                </div>

                <div className="flex justify-between items-center mb-2 text-xs">
                  <p className="text-gray-600">Delivery Charge</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>

                <div className="border-t pt-2 mt-2 flex justify-between items-center font-semibold text-xs text-gray-800">
                  <p>Grand Total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white flex flex-col justify-center items-center">
                <img
                  src={imageEmpty}
                  className="w-full h-full object-scale-down max-h-60"
                />
              </div>

              <Link
                onClick={close}
                to={"/"}
                className="mx-auto mt-3 block bg-green-600 px-5 py-2 text-white rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-[1.02]"
              >
                Shop Now
              </Link>
            </>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-3">
            <div className="bg-green-700 text-white rounded-lg px-5 py-2 flex items-center justify-between shadow-md">
              <div className="text-base font-semibold">
                {DisplayPriceInRupees(totalPrice)}
              </div>
              <button
                onClick={redirectToCheckoutPage}
                className="bg-white flex items-center gap-2 text-green-700 font-medium px-4 py-1.5 rounded-md text-sm active:scale-[0.98] transition-all duration-200"
              >
                Proceed
                <FaCaretRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;
