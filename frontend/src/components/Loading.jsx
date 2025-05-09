import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-[#68AB95] rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-[#D69CAA] rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-[#68AB95] rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loading;


// video 6:33:03 hour ki ho chuki he aur ham abhi upload product ke ander image upload wala bana rhe he matlab image upload ho chuki he and ab ussy hi aage badhana he fir baad me sab kuch dheere dheere banaker final ek product upload karenge