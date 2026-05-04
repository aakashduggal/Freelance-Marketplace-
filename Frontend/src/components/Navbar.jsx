import React from "react";
import {Link} from "react-router-dom"


const Navbar = ()=>{
    return(
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

                    <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Sign In</Link>
                      
                      {/* Join Button */} 
                    <Link to="/register"  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Join</Link>

                </div>

            </div>

        </div>

     </nav>
    )
}

export default Navbar