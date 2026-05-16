import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const Reviews = ({ gigId }) => {
    const { loading, error, sendRequest } = useFetch();
    const [reviews, setReviews] = useState([]);
    
    // Form States
    const [star, setStar] = useState(5);
    const [desc, setDesc] = useState("");
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Fetch existing reviews on mount
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/review/${gigId}`, {
                    method: "GET"
                });
                if(Array.isArray(data)) {
                    setReviews(data);
                }
            } catch (err) {
                console.log("Failed to fetch reviews", err);
            }
        };
        fetchReviews();
    }, [gigId]);

    // Submit new review
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            const newReview = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gigId, star: Number(star), desc })
            });

            // Add the new review to the UI instantly
            setReviews([...reviews, newReview]);
            setDesc("");
            setStar(5);
            setSubmitSuccess(true);
        } catch (err) {
            setSubmitError(err.message);
        }
    };

    return (
        <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

            {/* Loading / Error States */}
            {loading && <p className="text-gray-500">Loading reviews...</p>}
            {!loading && reviews.length === 0 && <p className="text-gray-500 mb-6">No reviews yet for this gig.</p>}

            {/* Reviews List */}
            <div className="flex flex-col gap-6 mb-10">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-3">
                            <img 
                                src="https://ui-avatars.com/api/?name=Buyer&background=random" 
                                alt="User" 
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900">Verified Buyer</h4>
                                <div className="flex gap-1 text-yellow-500 text-sm">
                                    {Array(review.star).fill().map((_, i) => (
                                        <span key={i}>⭐</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.desc}</p>
                    </div>
                ))}
            </div>

            {/* Add Review Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Add a Review</h3>
                
                {submitError && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium">{submitError}</div>}
                {submitSuccess && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm font-medium">Review submitted successfully!</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select 
                            value={star} 
                            onChange={(e) => setStar(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                        >
                            <option value="5">5 Stars - Excellent</option>
                            <option value="4">4 Stars - Very Good</option>
                            <option value="3">3 Stars - Average</option>
                            <option value="2">2 Stars - Poor</option>
                            <option value="1">1 Star - Terrible</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                        <textarea 
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Share your thoughts about this gig..."
                            rows="4"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors self-start mt-2"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reviews;
