import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import moment from 'moment'

const Messages = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { loading, error, sendRequest } = useFetch()
    const [conversations, setConversations] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await sendRequest("http://localhost:5000/api/conversation", {
                    method: "GET"
                })
                setConversations(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchConversations()
    }, [])

    const handleRead = async (id)=>{
        try {
            await sendRequest(`http://localhost:5000/api/conversation/${id}`,{
                method: "PUT"
            })
            navigate(`/message/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <div className="p-8 text-center">Loading chats...</div>

     return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Messages</h1>
            {/* Table shuru */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-left border-collapse">
                    
                    {/* Table Heading */}
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-bold text-gray-700">Buyer / Seller ID</th>
                            <th className="p-4 font-bold text-gray-700">Last Message</th>
                            <th className="p-4 font-bold text-gray-700">Date</th>
                            <th className="p-4 font-bold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body - Yahan par map() chalega */}
                    <tbody>
                        {conversations.map((chat) => (
                            // Har chat ek <tr> (row) ban jayegi
                            <tr 
                                key={chat.id} 
                                className={`border-b hover:bg-gray-50 transition-colors ${
                                    // Agar message unread hai, toh background thoda blue kar dena (bold)
                                    ((currentUser.isSeller && !chat.readBySeller) || 
                                    (!currentUser.isSeller && !chat.readByBuyer)) 
                                    ? "bg-blue-50 font-semibold" : ""
                                }`}
                            >
                                {/* Column 1: Dusre bande ki ID */}
                                <td className="p-4">
                                    {currentUser.isSeller ? chat.buyerId : chat.sellerId}
                                </td>
                                {/* Column 2: Last message (Click karne se chat khulegi) */}
                                <td className="p-4 text-gray-600">
                                    <Link to={`/message/${chat.id}`} className="hover:text-blue-600">
                                        {chat.lastMessage?.substring(0, 50)}...
                                    </Link>
                                </td>
                                {/* Column 3: Time (Moment js use karke) */}
                                <td className="p-4 text-gray-500">
                                    {moment(chat.updatedAt).fromNow()}
                                </td>
                                {/* Column 4: Mark as Read Button */}
                                <td className="p-4">
                                    {((currentUser.isSeller && !chat.readBySeller) || 
                                     (!currentUser.isSeller && !chat.readByBuyer)) && (
                                        <button 
                                            onClick={() => handleRead(chat.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Messages;