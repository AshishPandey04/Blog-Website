import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 to-gray-950  py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Copyright */}
          <div>
            <Logo width="120px" />
            <p className="mt-4 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact us</h3>
            <ul className="space-y-2">
              <li><Link className=" text-white hover:text-gray-100 transition" to="/">Account</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Help</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Customer Support</Link></li>
            </ul>
          </div>
        </div>

    
      </div>
    </footer>
  );
}

export default Footer;
