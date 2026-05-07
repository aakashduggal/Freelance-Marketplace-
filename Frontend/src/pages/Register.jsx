import { useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("client");


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Register data:", { name, email, password })
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>

            {/* Premium Card Container */}
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>

                {/* Form */}
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
                        Create Account
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