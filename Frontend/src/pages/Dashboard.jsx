import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {currentUser?.username || 'User'}!</p>
                    </div>
                    {currentUser?.isSeller && (
                        <Link to="/add" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition-all">
                            Create New Gig
                        </Link>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Active Orders */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Orders</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-all">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Unread Messages</p>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                        </div>
                    </div>

                    {/* Earnings (If Seller) */}
                    {currentUser?.isSeller && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-all">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">$1,250</p>
                            </div>
                        </div>
                    )}

                    {/* Active Gigs (If Seller) */}
                    {currentUser?.isSeller && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4 hover:shadow-md transition-all">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Gigs</p>
                                <p className="text-2xl font-bold text-gray-900">4</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Activity / Placeholder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">You're all caught up!</h2>
                    <p className="text-gray-500 mb-6">Explore the marketplace or check your active orders.</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/orders" className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                            View Orders
                        </Link>
                        <Link to="/gigs" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                            Explore Gigs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
