import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
        if(fetchOrder){
          fetchOrder()
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Redirecting to payment page...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id });

      if (fetchCartItem) {
        fetchCartItem();
      }
      if (fetchOrder) {
        fetchOrder();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 mt-7 lg:mt-0 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row w-full gap-6 justify-between">
        {/* Left: Address Section */}
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-semibold mb-2">Choose your address</h3>

          <div className="bg-white p-2 grid gap-4">
            {addressList.map((address, index) => {
              return (
                <label
                  htmlFor={"address" + index}
                  className={!address.status && "hidden"}
                  key={index + "checkout"}
                >
                  <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectAddress(e.target.value)}
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer hover:bg-blue-100 transition"
            >
              Add Address
            </div>
          </div>
        </div>

        {/* Right: Summary Section */}
        <div className="w-full lg:w-1/3 bg-white py-5 px-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-4">Summary</h3>

          <div className="bg-white space-y-4">
            <h3 className="font-semibold">Bill details</h3>

            <div className="flex justify-between text-sm">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400 text-sm">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span className="font-medium">
                  {DisplayPriceInRupees(totalPrice)}
                </span>
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p>Quantity total</p>
              <p>
                {totalQty} item{totalQty > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>

            <div className="font-semibold flex justify-between border-t pt-2">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 mt-5">
            <button
              onClick={handleOnlinePayment}
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold w-full text-sm"
            >
              Online Payment
            </button>

            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition w-full text-sm"
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;


// 4:02 min completed