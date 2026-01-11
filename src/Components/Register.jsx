import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("All fields required");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/userapi/reguser`,
                { name, email, password },
                { withCredentials: true }
            );

            toast.success("Registered Successfully");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            toast.error(err?.response?.data?.msg || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Helmet>
                <title>Register | QR App</title>
            </Helmet>

            <ToastContainer position="top-right" autoClose={2000} />

            <div className="bg-white shadow-lg p-6 rounded-lg w-[350px]">

                <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
                    Create Account
                </h2>

                <form onSubmit={handleFormSubmit}>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-800 text-white font-bold py-2 rounded hover:bg-green-700 transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
