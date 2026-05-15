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
    
    useEffect(()=>{
      const getMessages = async ()=>{
       try {
         const res = await sendRequest(`http://localhost:5000/api/message/getMessage/${id}`,{
             method: "GET"
         })
         setMessages(res)
       } catch (error) {
         console.log(error)
       }
    }
    getMessages()
    },[id])

    useEffect(()=>{
        // making connection with backend
        const newSocket = io("http://localhost:5000")
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
            const res = await sendRequest("http://localhost:5000/api/message",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    conversationId: id,
                    desc: desc
                })
            })
            setDesc("")
            setMessages((prev)=> [...prev, res])
            
            // fetching id of message receiver
            const receiverId = currentUser.isSeller ? id.substring(24) : id.substring(0, 24)

            // telling socket to send the message to receiver
            socket?.emit("sendMessage", {
              senderId : currentUser._id,
              receiverId: receiverId,
              desc: desc 
            })

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[80vh]">
            <span className="text-gray-500 text-sm mb-4">
                <Link to="/messages" className="hover:text-black font-semibold">Messages</Link> &gt; Chat
            </span>
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