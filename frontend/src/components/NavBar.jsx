import React, { useState } from 'react';
import LOGO from '../assets/logo.png';

const menuItems = [
    { name: "Home", link: "/" },
    { name: "Trades", link: "/trade" },
    { name: "Country", link: "/Country" },
    { name: "Basic Financials", link: "/companybasicfinancials" },
    { name: "News", link: "/news" }
];

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="sticky top-0 z-50 w-full px-4 bg-white text-blue-gray-900 border rounded-none shadow-md bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 ">
            <div className="flex items-center justify-between">
                <a href="/" className="flex items-center mr-4 cursor-pointer font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                    <img src={LOGO} alt="Logo" className="w-16 h-16" />
                </a>
                <div className="flex items-center gap-4">
                    <div className="hidden lg:block">
                        <ul className="flex gap-6">
                            {menuItems.map((item, index) => (
                                <li key={index} className="font-sans text-sm font-normal leading-normal text-blue-gray-900">
                                    <a href={item.link}>{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className="relative h-6 w-6 text-center text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        onClick={toggleMenu}
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`absolute top-0 left-0 w-full bg-white shadow-lg transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} origin-top`}>
                <div className="flex justify-between p-4 border-b">
                    <a href="#" className="flex items-center mr-4 cursor-pointer py-0 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                        <h2 className="text-lg font-semibold text-blue-gray-900">Menu</h2>
                    </a>
                    <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <ul className="p-4">
                    {menuItems.map((item, index) => (
                        <li key={index} className="py-2 text-blue-gray-900">
                            <a href={item.link}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
