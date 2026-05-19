import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const Message = ()=>{
    const {id} = useParams()
    const { currentUser } = useSelector((state) => state.user)
    const {sendRequest} = useFetch()
    const [messages, setMessages] = useState([])
    const [desc, setDesc] = useState("")
    const [socket, setSocket] = useState(null)
    const [convoDetail, setConvoDetail] = useState(null)
    const [otherUser, setOtherUser] = useState(null)
    
    useEffect(()=>{
      const getMessages = async ()=>{
       try {
         const res = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/message/getMessage/${id}`,{
             method: "GET"
         })
         setMessages(res)
       } catch (error) {
         console.log(error)
       }
    }
    const getSingleConvo = async ()=>{
        if (!currentUser) return;
        try {
            const singleConvo = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/conversation/single/${id}`,{
                method: "GET"
            })
            setConvoDetail(singleConvo)

            const isCurrentUserSeller = singleConvo.sellerId._id === currentUser._id;
            const otherUserObj = isCurrentUserSeller ? singleConvo.buyerId : singleConvo.sellerId;
            setOtherUser(otherUserObj)
        } catch (error) {
            console.log(error)
        }
    }
    getMessages()
    getSingleConvo()
    },[id, currentUser])

    useEffect(()=>{
        // making connection with backend
        const newSocket = io("https://freelance-marketplace-c0gx.onrender.com")
        setSocket(newSocket)

        // sending Id to backend so that backend can mark us Online
        if(currentUser){
            newSocket.emit("addUser", currentUser._id)
        }

        // terminating connection when page get closed
        return ()=>{
           newSocket.disconnect()
        }
    },[currentUser])

    useEffect(()=>{
        //if socket is not ready then return
        if(!socket) return 

        // when backend send getMessage
        socket.on("getMessage", (data)=>{
            // add new message to our list
            setMessages((prev) => [
                ...prev, {
                    userId: data.senderId, // who sent message
                    desc : data.desc, // what sent
                    _id: Date.now() // Temporary Id for UI

                }
            ])
        })
        // remove old listener so that user don't receive double msg
        return ()=>{
            socket.off("getMessage")
        }
    },[socket])
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await sendRequest("https://freelance-marketplace-c0gx.onrender.com/api/message",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    conversationId: id,
                    desc: desc
                })
            })
            setDesc("")
            setMessages((prev)=> [...prev, res])
            
            // telling socket to send the message to receiver
            socket?.emit("sendMessage", {
              senderId : currentUser._id,
              receiverId: otherUser?._id,
              desc: desc 
            })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[80vh]">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4">
                <Link to="/messages" className="hover:text-blue-600 transition-colors font-medium">
                    Messages
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-700 font-semibold truncate max-w-[200px] md:max-w-none">
                    {otherUser ? `Chat with ${otherUser.username}` : "Chat"}
                </span>
            </div>

            {/* Premium Chat Header */}
            <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3 md:gap-4">
                    {/* User Avatar */}
                    <div className="relative">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base md:text-lg shadow-inner">
                            {otherUser ? otherUser.username.charAt(0).toUpperCase() : "?"}
                        </div>
                        {/* Pulse active indicator */}
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 md:h-3.5 md:w-3.5 rounded-full ring-2 ring-white bg-green-500">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        </span>
                    </div>
                    {/* User Name and Role */}
                    <div>
                        <h2 className="text-sm md:text-lg font-bold text-gray-900 flex items-center gap-2">
                            {otherUser ? otherUser.username : "Loading User..."}
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] md:text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100">
                                {otherUser ? (otherUser.isSeller ? "Seller" : "Buyer") : "..."}
                            </span>
                        </h2>
                        <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            Active Now
                        </p>
                    </div>
                </div>
                
                {/* Back to Messages button */}
                <Link to="/messages" className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 border border-gray-200 rounded-xl text-xs md:text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-black hover:border-gray-300 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="hidden sm:inline">All Chats</span>
                </Link>
            </div>
            {/* Messages Print honge yahan */}
            <div className="flex-1 bg-gray-50 rounded-lg p-6 overflow-y-auto mb-4 border border-gray-200">
                {messages.map((m) => (
                    <div key={m._id} className={`flex flex-col gap-1 mb-4 ${m.userId === currentUser._id ? "items-end" : "items-start"}`}>
                        <div className={`px-4 py-2 rounded-lg max-w-md ${m.userId === currentUser._id ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}>
                            {m.desc}
                        </div>
                    </div>
                ))}
            </div>
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center justify-between gap-4 border-t pt-4">
                <textarea
                    placeholder="Type a message..."
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-3 resize-none h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                    Send
                </button>
            </form>
        </div>
    )
}
export default Message