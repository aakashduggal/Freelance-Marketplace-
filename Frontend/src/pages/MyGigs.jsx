import { useSelector } from "react-redux"; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch.js";

const MyGigs = () => {
    
    const currentUser = useSelector((state) => state.user.currentUser);
    const [gigs, setGigs] = useState([]);
    
    const { sendRequest, loading } = useFetch(); 


    useEffect(() => {
        const fetchGigs = async () => {
            if (!currentUser || !currentUser._id) return;
            try {
                const res = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/gigs/getGigs?userId=${currentUser._id}`, {
                    method: "GET",
                });
                setGigs(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGigs();
    }, [currentUser]); 

    const handleClick = async (gigId) => {
        
        if (window.confirm("Are you sure you want to delete this gig?")) {
            try {
            
                await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/gigs/delete/${gigId}`, {
                    method: "DELETE"
                });
                
                
                setGigs(gigs.filter((gig) => gig._id !== gigId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Gigs</h1>
                <Link to="/add">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        Add New Gig
                    </button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : gigs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-xl text-gray-500 font-medium">You haven't created any gigs yet.</p>
                    <p className="text-gray-400 mt-2">Start selling your services today!</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                    <th className="p-5 font-semibold">Image</th>
                                    <th className="p-5 font-semibold">Title</th>
                                    <th className="p-5 font-semibold">Price</th>
                                    <th className="p-5 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gigs.map(gig => (
                                    <tr key={gig._id} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors group">
                                        <td className="p-5">
                                            <div className="w-20 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                <img 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                    src={gig.cover || "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                                                    alt={gig.title} 
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.src = "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800";
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-5 font-medium text-gray-800 line-clamp-2 mt-2">{gig.title}</td>
                                        <td className="p-5 font-bold text-gray-900">₹{gig.price}</td>
                                        <td className="p-5 text-center">
                                            <button 
                                                onClick={() => handleClick(gig._id)} 
                                                className="bg-red-50 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-full transition-all duration-300"
                                                title="Delete Gig"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyGigs;