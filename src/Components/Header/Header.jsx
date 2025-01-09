import logo from "../../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import BeautifulDropdown from "../Elements/BeautifulDropdown";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleManageProfile = () => {
    setOpen(!open);
    navigate("/my-profile");
  };

  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <header className="flex justify-between md:items-center py-4 md:px-8 bg-gradient-to-r from-gray-50 to-gray-200 shadow-md w-full">
      <div className="flex flex-row gap-2 items-center flex-col sm:flex-row">
        <img
          src={logo}
          alt="Logo"
          className="h-12 pl-4 sm:pl-20 cursor-pointer transition-transform transform hover:scale-105"
          onClick={() => navigate("/")}
        />
        <BeautifulDropdown />
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer relative self-end md:self-center mr-8"
        onClick={handleClick}
        ref={buttonRef}
      >
        <p className="font-semibold text-lg text-gray-800 hover:text-gray-600 transition-colors">
          Admin
        </p>
        <CgProfile className="text-3xl text-gray-800 hover:text-gray-600 transition-colors" />
      </div>
      {open && (
        <div
          ref={modalRef}
          className="absolute top-[70px] right-8 w-48 bg-white shadow-lg rounded-lg py-2 z-10 border border-gray-200 "
        >
          <button
            className="w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 transition-colors rounded-md"
            onClick={handleManageProfile}
          >
            Manage Profile
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
