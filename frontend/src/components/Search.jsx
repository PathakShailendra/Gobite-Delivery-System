import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg border  overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-[#D69CAA]">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-[#D69CAA] bg-white rounded-full shadow-md"
          >
            <FaArrowLeft />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-[#D69CAA]">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          // not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Search 'milk'",
                1000,
                "Search 'bread'",
                1000,
                "Search 'sugar'",
                1000,
                "Search 'paneer'",
                1000,
                "Search 'chocolate'",
                1000,
                "Search 'curd'",
                1000,
                "Search 'rice'",
                1000,
                "Search 'eggs'",
                1000,
                "Search 'chips'",
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="search for atta dal and more"
              defaultValue={searchText}
              autoFocus={true}
              className="bg-transparent w-full h-full outline-none"
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
