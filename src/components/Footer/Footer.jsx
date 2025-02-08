import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-950 text-gray-300 py-10 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Copyright */}
          <div>
            <Link to="/">
              <Logo width="120px" />
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-100 transition" to="/">Features</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Pricing</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-100 transition" to="/">Account</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Help</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Customer Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-gray-100 transition" to="/">Terms & Conditions</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-gray-100 transition" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 mt-8 pt-5 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fa-brands fa-facebook text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fa-brands fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
