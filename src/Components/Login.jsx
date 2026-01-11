import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const navigate = useNavigate();
    const [userdt, setUserdt] = useState({ uemail: '', upass: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserdt({ ...userdt, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "https://ultimateqrbackend-sigma.vercel.app/userapi/loginuser",
                formData,
                { withCredentials: true }
            );

            localStorage.setItem("token", res.data.token);

            toast.success("Login successful");
            navigate("/dashboard");   // 👈 AUTO DASHBOARD
        } catch (err) {
            toast.error("Login failed");
        }
    };


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Helmet>
                <title>Login | QR App</title>
            </Helmet>

            <ToastContainer position="top-center" autoClose={2000} />

            <div className="bg-white shadow-lg p-6 rounded-lg w-[350px]">

                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        name="uemail"
                        placeholder="Enter Email"
                        required
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        name="upass"
                        placeholder="Enter Password"
                        required
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* ✅ Forgot Password */}
                    <div className="flex justify-end mb-4">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white font-bold py-2 rounded hover:bg-green-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Don’t have an account?
                    <Link to="/register" className="text-blue-600 ml-1 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
