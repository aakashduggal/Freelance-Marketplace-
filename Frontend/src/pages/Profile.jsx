import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                
                {/* Profile Info */}
                <div className="relative px-8 pb-8">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-8">
                        <div className="w-32 h-32 bg-white rounded-full p-2 shadow-md flex items-center justify-center">
                            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600">
                                {currentUser?.username ? currentUser.username[0].toUpperCase() : "U"}
                            </div>
                        </div>
                    </div>
                    
                    {/* User Details */}
                    <div className="pt-20">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900">{currentUser?.username || "John Doe"}</h1>
                                <p className="text-gray-500 font-medium mt-1">{currentUser?.email || "user@example.com"}</p>
                            </div>
                            <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100 shadow-sm">
                                {currentUser?.isSeller ? "Freelancer" : "Client"}
                            </span>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Hi! I am a passionate {currentUser?.isSeller ? "freelancer ready to deliver top-quality work." : "client looking for talented individuals to collaborate on exciting projects."} I believe in clear communication, timely delivery, and professional excellence. Looking forward to working together!
                            </p>
                        </div>

                        {/* Extra Stats/Details Placeholder */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Member Since</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">2023</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Response Time</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">~ 1 hr</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">India</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Language</p>
                                <p className="mt-1 text-lg font-bold text-gray-900">English</p>
                            </div>
                        </div>

                        {/* Edit Button Placeholder */}
                        <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                            <button className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
