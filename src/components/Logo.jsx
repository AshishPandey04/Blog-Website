import logo from "../assets/logo.png"; // Adjust path as needed
import React from "react";

function Logo({ width = "50px" }) {
  return <img src={logo} alt="Logo" style={{ width }} className="rounded-lg shadow-md m-2" />;
  
}

export default Logo;

