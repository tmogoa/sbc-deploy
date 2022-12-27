import React, { useState, useContext } from "react";
import { AppContext } from "../util/AppContext";
import { Link } from "react-router-dom";
import UserBar from "./UserBar";
import { IoMenuOutline } from "react-icons/io5";
import colors from "../../../assets/colors";
import logo from "../../../assets/img/logo.webp";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AppContext);
    return (
        <div className="flex flex-col lg:flex-row p-2 lg:p-5 z-30 shadow text-white bg-opacity-80 bg-gray-600 items-center lg:gap-4">
            <div className="font-heading text-4xl md:text-5xl lg:text-5xl w-full lg:w-2/12 text-center flex flex-row justify-between items-center lg:justify-center">
                <div className="px-2">
                    <Link to="/">
                        <img
                            src={logo}
                            className="w-8 lg:w-10"
                            alt="Sudek Boys Club logo"
                        />
                    </Link>
                </div>
                <div
                    className="lg:hidden p-2 rounded-full active:bg-gray-400"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                >
                    {isOpen ? (
                        <MdOutlineKeyboardArrowUp
                            size={25}
                            color={colors.white}
                        />
                    ) : (
                        <IoMenuOutline size={30} color={colors.white} />
                    )}
                </div>
            </div>
            <div
                className={`flex-grow flex flex-col lg:flex-row gap-2 lg:gap-6 text-base transition-height duration-500 items-center ease-in-out ${
                    !isOpen
                        ? "h-0 lg:h-auto overflow-hidden lg:overflow-visible"
                        : `${user ? "h-[21rem]" : "h-[17rem]"} lg:h-auto`
                }`}
            >
                <Link to="/">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        Home
                    </div>
                </Link>
                <Link to="/activities">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        Activities
                    </div>
                </Link>
                <a href="https://forms.gle/gvqoWmMDxFQEQYf18" target="_blank">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        Register
                    </div>
                </a>
                <Link to="/boys-corner">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        Boy's Corner
                    </div>
                </Link>
                <Link to="/about">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        About
                    </div>
                </Link>
                <Link to="/contact-us">
                    <div className="px-4 rounded-3xl py-2 text-center hover:bg-orange-400 active:bg-orange-400 cursor-pointer">
                        Contact us
                    </div>
                </Link>
                <div className="lg:w-2/12 flex flex-grow justify-end">
                    <UserBar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
