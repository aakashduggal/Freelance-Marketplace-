import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";


const AddGig = () => {
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const [singleFeature, setSingleFeature] = useState("");
    const navigate = useNavigate();
    const { sendRequest } = useFetch();


    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value }
        });
    };

    const handleAddFeature = (e) => {
        e.preventDefault();
        if (singleFeature.trim()) {
            dispatch({ type: "ADD_FEATURE", payload: singleFeature });
            setSingleFeature("");
        }
    };

    const handleRemoveFeature = (feature) => {
        dispatch({ type: "REMOVE_FEATURE", payload: feature });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend pe Gig create karne ki request (POST)
            const res = await sendRequest("http://localhost:5000/api/gigs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state) // state me tera poora form ka data hai
            });

            // Gig banne ke baad usko /gigs page par bhej do
            navigate("/gigs");
        } catch (error) {
            console.log(error);
            alert("Gig banane me error aaya!");
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Add a New Gig</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={state.title}
                            onChange={handleChange}
                            placeholder="e.g. I will do something I'm really good at"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select
                            name="cat"
                            value={state.cat}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        >
                            <option value="">Select a category</option>
                            <option value="design">Design</option>
                            <option value="web">Web Development</option>
                            <option value="animation">Animation</option>
                            <option value="music">Music</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                        <input
                            type="text"
                            name="cover"
                            value={state.cover}
                            onChange={handleChange}
                            placeholder="e.g. https://image.url"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            name="desc"
                            value={state.desc}
                            onChange={handleChange}
                            placeholder="Brief descriptions to introduce your service to customers"
                            rows="6"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        ></textarea>
                    </div>
                </div>

                {/* Right Column - Pricing & Details */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
                        <input
                            type="text"
                            name="shortTitle"
                            value={state.shortTitle}
                            onChange={handleChange}
                            placeholder="e.g. One-page web design"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                        <textarea
                            name="shortDesc"
                            value={state.shortDesc}
                            onChange={handleChange}
                            placeholder="Short description of your service"
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time (Days)</label>
                            <input
                                type="number"
                                name="deliveryTime"
                                value={state.deliveryTime}
                                onChange={handleChange}
                                min="1"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Revision Number</label>
                            <input
                                type="number"
                                name="revisionNumber"
                                value={state.revisionNumber}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Add Features</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={singleFeature}
                                onChange={(e) => setSingleFeature(e.target.value)}
                                placeholder="e.g. Source File"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                            />
                            <button
                                onClick={handleAddFeature}
                                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        {/* Tags Display */}
                        {state.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {state.features.map((feature, index) => (
                                    <span key={index} className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {feature}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(feature)}
                                            className="text-green-600 hover:text-red-500 focus:outline-none"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={state.price}
                            onChange={handleChange}
                            min="1"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm text-gray-800"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1 mt-6"
                    >
                        Create Gig
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGig;
