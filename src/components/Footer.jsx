import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0d1117] text-white pt-16 pb-8 px-6 md:px-20">
      {/* Top Section */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 text-sm">
        {/* Company Info */}
        <div>
          <img src="/logo.jpg" className="mb-5 w-20 mt-4  " alt="Company Logo" style={{borderRadius:"12px" ,marginLeft:"10px"}} />
          <p className="w-full md:w-3/4 text-gray-400 leading-relaxed m-4">
            <div>Crafting memories, one heartfelt gift at a time. </div>
            <div>

Where every gift tells a story of love and thoughtfulness.
            </div>

          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5 tracking-wide mt-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>
              <Link 
                to="/" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/aboutus" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/termandpolicy" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                Terms & Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/contactus" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/privacypolicy" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/faq" 
                className="hover:text-orange-400 transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-5 tracking-wide mt-4">Get in Touch</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            {/*<li className="hover:text-orange-400 transition-colors duration-200">
              +1-212-456-7890 
            </li> */}
            <li className="hover:text-orange-400 transition-colors duration-200">
              sggiftslove@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
        <p>© 2025 SG Gifts. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
