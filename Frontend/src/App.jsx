import { BrowserRouter, Routes, Route } from "react-router-dom"
import GigDetail from "./pages/GigDetail"
import Gigs from "./pages/Gigs"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import RequireAuth from "./components/RequireAuth"
import AddGig from "./pages/AddGig"
import Pay from "./pages/Pay"
import Success from "./pages/Success"


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={  <Login/> }/>
      <Route path="/register" element={<Register/>}/>
      <Route path="gigs" element={<Gigs/>}/> 
      <Route path="gig/:id" element={ <RequireAuth> <GigDetail/> </RequireAuth>}/>
      <Route path="/add" element={ <RequireAuth> <AddGig/> </RequireAuth>}/>
      <Route path="/pay/:id" element={ <RequireAuth> <Pay/> </RequireAuth>}/>
      <Route path="/success" element={ <RequireAuth> <Success/> </RequireAuth>}/>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
