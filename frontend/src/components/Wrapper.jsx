import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[1200px] md:mx-auto px-5 py-0 md:py-10 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
