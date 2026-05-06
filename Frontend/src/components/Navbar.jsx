import React from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from 'react'

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const currentUser = useSelector((state) => state.user.currentUser)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    return (

        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">

            {/* Main container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Flexbox - Logo & Links */}
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Freelance Marketplace</Link>

                    {/* Link Wrapper */}
                    <div className="flex items-center gap-8">

                        {/* Normal LInks(explore, sign in) */}
                        <Link to="/gigs" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Explore</Link>

                        {/* if isLoggedIn false, then login/register dikhao */}
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Sign In</Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Join</Link>
                            </>
                        ) : (
                            /* if isLoggedIn true, then User Profile / Avatar dikhao */
                            <div className="relative">

                                {/* Avatar (Clickable) */}
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
                                >
                                    {/* Showing first letter of user's name */}
                                    <span className="text-indigo-600 font-bold text-lg">
                                        {currentUser?.username ? currentUser.username[0].toUpperCase() : "U"}
                                    </span>
                                </div>

                                {/* Dropdown Menu (Open only when isDropdownOpen true hoga) */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50">
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Dashboard</Link>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Profile</Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    )
}

export default Navbar