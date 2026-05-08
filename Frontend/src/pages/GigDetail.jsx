import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Reviews from '../components/Reviews'

const GigDetail = () => {

    const { id } = useParams();

    const { loading, error, sendRequest } = useFetch();
    const [gig, setGig] = useState(null);

    useEffect(() => {
        const fetchSingleGig = async () => {
            try {
                const data = await sendRequest(`http://localhost:5000/api/gigs/getGig/${id}`, {
                    method: "GET"
                })
                setGig(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleGig()
    }, [id])

    // Agar load ho raha hai toh Loading dikhao
    if (loading) return <div className="p-8 text-center text-xl font-semibold">Loading Gig Details...</div>;
    // Agar gig na mile ya error aaye
    if (error || !gig) return <div className="p-8 text-center text-red-500">Gig Not Found!</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">

            {/* LEFT SIDE: Image & Description */}
            <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
                <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden mb-8">
                    <img src={gig.cover} alt={gig.title} className="w-full h-full object-cover" />
                </div>

                <h2 className="text-xl font-bold mb-2">About This Gig</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{gig.desc}</p>
                
                {/* Reviews Section */}
                <Reviews gigId={id} />
            </div>
            {/* RIGHT SIDE: Checkout / Pricing Box */}
            <div className="md:w-1/3">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-gray-800">{gig.shortTitle}</h3>
                        <h2 className="text-2xl font-bold text-gray-900">₹{gig.price}</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">{gig.shortDesc}</p>

                    <div className="flex flex-col gap-2 mb-6 text-sm font-semibold text-gray-700">
                        <span className="flex items-center gap-2">🕒 {gig.deliveryTime} Days Delivery</span>
                        <span className="flex items-center gap-2">🔄 {gig.revisionNumber} Revisions</span>
                    </div>
                    {/* Features Array Map */}
                    <div className="flex flex-col gap-2 mb-6">
                        {gig.features && gig.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="text-green-500">✔</span> {feature}
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                        Continue (₹{gig.price})
                    </button>
                </div>
            </div>
        </div>
    );
};
export default GigDetail;