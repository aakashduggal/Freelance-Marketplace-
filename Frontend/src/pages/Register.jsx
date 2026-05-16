import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'


const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("client");

    const { loading, error, sendRequest } = useFetch();


    const handleSubmit = async (e) => {
        e.preventDefault()
        const bodyData = {
            username: name,
            email: email,
            password: password,
            isSeller: role === "freelancer" ? true : false
        }
        try {
            const data = await sendRequest('https://freelance-marketplace-c0gx.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData)
            });
            // Registration hone ke baad ek alert dikha ke Login page par bhej rahe hain
            alert("Registration Successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.log("Registeration Failed:", error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>

            {/* Premium Card Container */}
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>

            {/* Form */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                    {/* name input*/}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input
                            type="text"
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                            placeholder='John'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>


                    {/* Email Input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <input
                            type="email"
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
                            placeholder='name@company.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    {/* Role Selection Dropdown */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>I want to...</label>
                        <select
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="client">Hire a Freelancer (I am a Client)</option>
                            <option value="freelancer">Find Work (I am a Freelancer)</option>
                        </select>
                    </div>




                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className='w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {/* Footer Text */}
                <p className='text-center text-sm text-gray-600 mt-6'>
                    Already have an account?{' '}
                    <Link to="/login" className='text-indigo-600 font-semibold hover:underline'>
                        Login
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Register