import { Link } from "react-router-dom"

const GigCard = ({ gig }) => {
    // calculating rating
    const rating = gig.starNumber !== 0 ? Math.round(gig.totalStars / gig.starNumber) : 0;

    return (
        <Link 
            to={"/gig/" + gig._id} 
            // Ye "group" class zaroori for hover animations 
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col"
        >
            {/* Image Section (Top) */}
            <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img 
                    src={gig.cover || "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                    alt={gig.title} 
                    onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop if placeholder also fails
                        e.target.src = "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                    // group-hover:scale-110 se mouse laane par photo zoom hogi!
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content Section (Bottom) */}
            <div className="p-5 flex flex-col flex-grow justify-between">
                
                {/* Title */}
                <div>
                    <h2 className="text-gray-800 font-semibold text-lg line-clamp-2 hover:text-indigo-600 transition-colors">
                        {gig.title}
                    </h2>
                </div>

                {/* Rating & Price */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500 font-medium">
                        <span>⭐</span>
                        <span>{rating}</span>
                        <span className="text-gray-400 text-sm font-normal">({gig.starNumber})</span>
                    </div>
                    
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Starting at</p>
                        <p className="text-xl font-bold text-gray-900">₹{gig.price}</p>
                    </div>
                </div>

            </div>
        </Link>
    )
}


export default GigCard
