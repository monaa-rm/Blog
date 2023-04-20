import React, { useEffect, useState , useRef} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
    document.addEventListener('mousedown',closeOpenMenus)
  }, [location.pathname , isOpen]);

  const dropdownCloseHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsOpen(true)
  }

  const isActiveHandler = () => {
    setIsActive(location.pathname);
    setIsOpen(false);
  };
  const catMenu = useRef(null)
  const closeOpenMenus = (e)=>{
    if(catMenu.current && !catMenu.current.contains(e.target)){
      setIsOpen(false)
    }
}
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 transition duration-500 ease-out">
        <div className="relative flex h-11 sm:h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              // class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={(e) =>dropdownCloseHandle(e)}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className={`${
                  isOpen ? "hidden" : "block"
                } h-6 w-6 text-white transition duration-75 ease-in`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
  
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="block text-indigo-700 text-xl leading-6  font-bold h-8 w-auto lg:hidden hover:text-indigo-800">
                Blogify
              </span>
              <span className="hidden text-indigo-700 font-bold text-3xl leading-6  h-8 w-auto lg:block hover:text-indigo-800">
                Blogify
              </span>
            </div>
            <div
              className="hidden sm:ml-6 sm:block"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="flex space-x-4" role="none">
                <Link
                  to="/"
                  className={`${
                    isActive === "/"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } text-white rounded-md px-3 py-2 text-sm font-medium`}
                  aria-current="page"
                >
                  Home
                </Link>

                <Link
                  to="/addBlog"
                  className={`${
                    isActive === "/addBlog"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } text-white rounded-md px-3 py-2 text-sm font-medium`}                >
                  Add Blog
                </Link>

                <Link
                  to="/about"
                  className={`${
                    isActive === "/about"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } text-white rounded-md px-3 py-2 text-sm font-medium`}                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}

      <div
        className="sm:hidden"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        id="mobile-menu"
      >
        {isOpen && (
          <div
            className="space-y-1 px-2 pt-2 pb-3  transition duration-500 ease-out"
            role="none"
            ref={catMenu}
          >
            <Link
              to="/"
              className={`${
                isActive == "/"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block text-white rounded-md px-3 py-2 text-sm font-medium`}
              aria-current="page"
              role="menuitem"
              id="menu-item-0"
              onClick={() => isActiveHandler()}
            >
              Home
            </Link>

            <Link
              to="/addBlog"
              className={`${
                isActive == "/addBlog"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block text-white rounded-md px-3 py-2 text-sm font-medium`}
              role="menuitem"
              id="menu-item-1"
              onClick={() => isActiveHandler()}
            >
              Add Blog
            </Link>

            <Link
              to="/about"
              className={`${
                isActive == "/about"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block text-white rounded-md px-3 py-2 text-sm font-medium`}
              role="menuitem"
              id="menu-item-2"
              onClick={() => isActiveHandler()}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
