import {useState} from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../redux/slices/userSlice' 


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading, error, sendRequest} = useFetch()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await sendRequest('https://freelance-marketplace-c0gx.onrender.com/api/auth/login',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            })
            console.log("Login Success", data)
            localStorage.setItem("currentUser", JSON.stringify(data.finalUser));
            dispatch(loginSuccess(data.finalUser));
            // Login hote hi user ko Gigs wale page par bhej do
            navigate('/gigs');
            
        } catch (error) {
            console.log("Login Failed:", error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            
            {/* Premium Card Container */}
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>
                
                {/* Heading */}
                <h3 className='text-3xl font-extrabold text-gray-900 mb-6 text-center'>Welcome Back</h3>
                
                {/* Form */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    
                    {/* Username Input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
                        <input 
                            type="text" 
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                            placeholder='johndoe123'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input 
                            type="password" 
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                            placeholder='••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className='w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer Text */}
                <p className='text-center text-sm text-gray-600 mt-6'>
                    Don't have an account?{' '}
                    <Link to="/register" className='text-indigo-600 font-semibold hover:underline'>
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login