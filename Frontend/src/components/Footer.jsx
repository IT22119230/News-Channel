import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1c3d] text-gray-400 text-sm px-6 py-8">
      {/* Footer Grid Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Column 1 */}
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/NBC_logo.svg"
            alt="NBC Logo"
            className="w-12 mb-4"
          />
          <ul className="space-y-2">
            <li>ABOUT</li>
            <li>CONTACT</li>
            <li>HELP</li>
            <li>CAREERS</li>
            <li>AD CHOICES</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <ul className="space-y-2">
            <li>PRIVACY POLICY</li>
            <li>YOUR PRIVACY CHOICES</li>
            <li>CA NOTICE</li>
            <li>TERMS OF SERVICE (UPDATED JULY 7, 2023)</li>
            <li>NBC NEWS SITEMAP</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <ul className="space-y-2">
            <li>CLOSED CAPTIONING</li>
            <li>ADVERTISE</li>
            <li>SELECT SHOPPING</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-6"></div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
        <p className="text-gray-500 text-center md:text-left">
          © 2024 NBCUniversal Media, LLC
        </p>
        <div className="flex justify-center space-x-4">
          <span className="text-gray-500">NBC NEWS</span>
          <span className="text-gray-600">MSNBC</span>
          <span className="text-gray-700">TODAY</span>
        </div>
      </div>
    </footer>
  );
}
