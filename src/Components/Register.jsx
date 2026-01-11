import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// 🔥 Backend URL from .env (works for both localhost & Vercel)
const BASE_URL = import.meta.env.VITE_BACKEND_URL

const Register = () => {
    const navigate = useNavigate()

    const [userdt, setUserdt] = useState({
        uname: '',
        uemail: '',
        upass: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserdt({ ...userdt, [name]: value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(
                `${BASE_URL}/userapi/reguser`,   // ✅ dynamic backend URL
                userdt,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            toast.success(res.data.msg)

            setTimeout(() => {
                navigate("/login")
            }, 1500)

        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Registration failed")
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <Helmet><title>Register | Mern Crash Course</title></Helmet>
            <ToastContainer position="top-right" autoClose={2000} />

            <div className='bg-white shadow-md p-6 rounded-b-lg w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Registration</h2>

                <input
                    type='text'
                    name='uname'
                    placeholder='Enter username'
                    required
                    className='w-full p-2 border rounded mb-3'
                    onChange={handleInputChange}
                />

                <input
                    type='email'
                    name='uemail'
                    placeholder='Enter Email Id'
                    required
                    className='w-full p-2 border rounded mb-3'
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    name='upass'
                    placeholder='Enter password'
                    required
                    className='w-full p-2 border rounded mb-3'
                    onChange={handleInputChange}
                />

                <button
                    className='w-full bg-blue-500 text-white font-bold hover:bg-blue-700 p-2 rounded'
                    onClick={handleFormSubmit}
                >
                    Register
                </button>

                <p className='mt-3 text-center'>
                    Already have account?
                    <Link to="/login" className='text-blue-500 hover:underline ml-1'>
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
