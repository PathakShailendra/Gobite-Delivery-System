import React from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import SummaryApi from "../common/SummaryApi";
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";


const AddAddress = ({close}) => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchAddress } = useGlobalContext()

  const onSubmit = async (data) => {

    try {
      const response = await Axios({
          ...SummaryApi.createAddress,
          data : {
              address_line :data.addressline,
              city : data.city,
              state : data.state,
              country : data.country,
              pincode : data.pincode,
              mobile : data.mobile
          }
      })

      const { data : responseData } = response
      
      if(responseData.success){
          toast.success(responseData.message)
          if(close){
              close()
              reset()
              fetchAddress()
          }
      }
  } catch (error) {
      AxiosToastError(error)
  }
  };

  return (
    <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50 h-screen overflow-auto">
      <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold">Add Address</h2>
          <button
            onClick={close}
            className="w-fit block ml-auto p-1.5 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-200/50 hover:scale-110 hover:shadow-md active:scale-95 cursor-pointer"
          >
            <IoClose
            onClick={close}
              size={25}
              className="text-gray-700 transition-colors duration-300 hover:text-red-500"
            />
          </button>
        </div>

        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <label htmlFor="">Address Line :</label>
            <input
              type="text"
              id="addressline"
              className="border bg-blue-50 p-2 rounded"
              {...register("addressline", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city">City :</label>
            <input
              type="text"
              id="city"
              className="border bg-blue-50 p-2 rounded"
              {...register("city", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="state">State :</label>
            <input
              type="text"
              id="state"
              className="border bg-blue-50 p-2 rounded"
              {...register("state", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="pincode">Pincode :</label>
            <input
              type="text"
              id="pincode"
              className="border bg-blue-50 p-2 rounded"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              id="country"
              className="border bg-blue-50 p-2 rounded"
              {...register("country", { required: true })}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No. :</label>
            <input
              type="text"
              id="mobile"
              className="border bg-blue-50 p-2 rounded"
              {...register("mobile", { required: true })}
            />
          </div>

          <button className="mt-4 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#D69CAA] to-[#C08497] rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:from-[#68AB95] hover:to-[#4C9C84] hover:shadow-xl active:scale-95">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;

// video 38 min completed add address wala part bana rahe he
