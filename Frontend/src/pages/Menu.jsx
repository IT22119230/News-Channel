import React from 'react';
import { Link } from "react-router-dom";
import SignUp from './SignUp';

export default function Menu() {
  return (
    <div className="max-w-screen-lg mx-auto p-4 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-black">NBC NEWS</h1>
        <input
          type="text"
          placeholder="Search NBC News"
          className="w-full md:w-1/2 border rounded-md px-3 py-2 outline-none"
        />
        <div className="flex gap-3">
        <Link to="/sign-in">
       <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
         SIGN IN
       </button>
        </Link>
        <Link to="/sign-up">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          CREATE YOUR FREE PROFILE
        </button>
      </Link>
        </div>
      </div>

      {/* Main Menu Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 overflow-y-auto h-screen md:h-auto">
        {/* Section 1 */}
        <div className="space-y-2">
          <h3 className="font-bold">U.S. NEWS</h3>
          <h3 className="font-bold">DECISION 2024</h3>
          <h3 className="font-bold">POLITICS</h3>
          <h3 className="font-bold">WORLD</h3>
          <h3 className="font-bold">BUSINESS</h3>
          <h3 className="font-bold">SPORTS</h3>
          <h3 className="font-bold">INVESTIGATIONS</h3>
          <h3 className="font-bold">CULTURE & TRENDS</h3>
          <h3 className="font-bold">HEALTH</h3>
          <h3 className="font-bold">SCIENCE</h3>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h3 className="font-bold">TECH & MEDIA</h3>
          <h3 className="font-bold">WEATHER</h3>
          <h3 className="font-bold">VIDEO FEATURES</h3>
          <h3 className="font-bold">PHOTOS</h3>
          <h3 className="font-bold">NBC SELECT</h3>
          <h3 className="font-bold">NBC ASIAN AMERICA</h3>
          <h3 className="font-bold">NBC BLK</h3>
          <h3 className="font-bold">NBC LATINO</h3>
          <h3 className="font-bold">NBC OUT</h3>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h3 className="font-bold">LOCAL</h3>
          <p>NEW YORK</p>
          <p>LOS ANGELES</p>
          <p>CHICAGO</p>
          <p>DALLAS-FORT WORTH</p>
          <p>PHILADELPHIA</p>
          <p>WASHINGTON, D.C.</p>
          <p>BOSTON</p>
          <p>BAY AREA</p>
          <p>SOUTH FLORIDA</p>
          <p>SAN DIEGO</p>
          <p>CONNECTICUT</p>
        </div>

        {/* Section 4 */}
        <div className="space-y-2">
          <h3 className="font-bold">TV</h3>
          <p>TODAY</p>
          <p>NIGHTLY NEWS</p>
          <p>MSNBC</p>
          <p>MEET THE PRESS</p>
          <p>DATELINE</p>
        </div>

        {/* Section 5 */}
        <div className="space-y-2">
          <h3 className="font-bold">FEATURED</h3>
          <p>NBC NEWS NOW</p>
          <p>NIGHTLY FILMS</p>
          <p>STAY TUNED</p>
          <p>SPECIAL FEATURES</p>
          <p>NEWSLETTERS</p>
          <p>PODCASTS</p>
          <p>LISTEN NOW</p>
        </div>
      </div>
    </div>
  );
}
