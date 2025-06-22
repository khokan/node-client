import React from "react";
import logo from "../../assets/logo.png"; // Adjust the path as necessary

const Logo = () => {
  return (
    <div className="flex items-end">
      <img className="mb-2" src={logo} alt="Logo" />
      <p className="text-3xl -ml-2 font-extrabold">ProFast</p>
    </div>
  );
};

export default Logo;
