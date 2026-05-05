import { useSelector } from "react-redux"
import {Navigate} from "react-router-dom"

const RequireAuth = ({children})=>{
    
        const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
       
        if(!isLoggedIn){
            return <Navigate to="/login" replace />
        }
        
        return children
     
}

export default RequireAuth