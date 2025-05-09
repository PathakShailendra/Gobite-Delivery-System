import React, { useEffect, useState } from "react";
import logo from "../assets/GO_BITE_LOGO.svg";
import Search from "./Search";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setopenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state?.cartItem?.cart);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);
  const { totalPrice, totalQty } = useGlobalContext();
  const [ openCartSection, setOpenCartSection ] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setopenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  //total items and total price

  // useEffect(() => {
  //   const qty = cartItem.reduce((preve, curr) => {
  //     return preve + curr.quantity;
  //   }, 0);
  //   setTotalQty(qty);

  //   const tPrice = cartItem.reduce((preve, curr) => {
  //     return preve + curr.productId.price * curr.quantity;
  //   }, 0);
  //   setTotalPrice(tPrice);
  // }, [cartItem]);

  return (
    <header className="h-24 lg:h-20 sticky lg:shadow-md top-0 z-40 flex justify-center flex-col gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/* logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex items-center justify-center">
              <img
                src={logo}
                width={140}
                height={50}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={110}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* search */}

          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div>
            {/**user icons display in only mobile version**/}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={25} />
            </button>

            {/**Desktop**/}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setopenUserMenu((prev) => !prev)}
                    className="flex items-center select-none gap-2 cursor-pointer"
                  >
                    <p className="text-md">Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 font-semibold"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 text-white rounded-lg"
              >
                {/* {add to cart icons} */}
                <div className="animate-bounce">
                  <FaCartShopping size={28} />
                </div>
                <div className="font-semibold text-sm">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p> My cart </p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>

      {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
    </header>
  );
};

export default Header;
