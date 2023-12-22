import React, { useState } from "react";
import sunDark from "../../public/assets/images/icon-sun-dark.svg";
import moonDark from "../../public/assets/images/icon-moon-dark.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Header() {
  // DARK & LIGHT MODE DYNAMIC

  const [dark, setDark] = useState(false);
  const handleToggle = () => {
    setDark(!dark);
  };

  useEffect(() => {
    dark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="flex flex-col gap-6 pt-2 px-5 mb-12 sm:px-10 md:px-20 lg:px-32 xl:px-56 2xl:px-96">
      {/* User profile name firts level*/}
      <div className="flex justify-end">
        <p className="italic text-[#91a2b7]">
          Welcome {localStorage.getItem("name")}
        </p>
      </div>
      {/* Header second level */}
      <div className="flex justify-between">
        {/* LOGOUT BUTTON EXIT */}
        <Link
          className="text-black bg-slate-400 dark:text-white font-bold dark:bg-slate-600 px-4 rounded-full "
          to="/"
        >
          Log out
        </Link>
        {/* Light/dark mode */}
        <div className="flex gap-3">
          <img src={sunDark}></img>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={handleToggle}
              type="checkbox"
              value=""
              className="sr-only peer"
            ></input>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <img src={moonDark}></img>
        </div>
      </div>
    </header>
  );
}

export default Header;
