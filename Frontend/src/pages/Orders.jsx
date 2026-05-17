import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Orders = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);
    const { loading, error, sendRequest } = useFetch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await sendRequest('https://freelance-marketplace-c0gx.onrender.com/api/orders', {
                    method: "GET"
                });
                setOrders(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrders();
    }, []);

    const handleContact = async (order) => {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId; // Logic used in conversation controller: id is sellerId+buyerId

        try {
            const res = await sendRequest("https://freelance-marketplace-c0gx.onrender.com/api/conversation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: currentUser.isSeller ? buyerId : sellerId
                })
            });
            navigate(`/messages`);
        } catch (err) {
            if (err?.response?.status === 404) {
                // Ignore if it already exists, or just navigate
                navigate(`/messages`);
            } else {
                console.log(err);
                // If conversation already exists (from backend logic), it might throw an error or return it.
                navigate(`/messages`);
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-lg font-medium">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Orders</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg">No orders found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Image</th>
                                <th className="p-4 font-semibold text-gray-700">Title</th>
                                <th className="p-4 font-semibold text-gray-700">Price</th>
                                <th className="p-4 font-semibold text-gray-700">Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-16 h-12 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{order.title}</td>
                                    <td className="p-4 text-gray-600">₹{order.price}</td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => handleContact(order)}
                                            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Message
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;