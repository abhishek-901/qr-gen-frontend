import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgetPass = () => {
    const [uemail, setUemail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uemail) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.post(
                "http://localhost:5000/userapi/forgetpass",
                { uemail }
            );

            // backend jo msg bheje wahi show karo
            if (data.msg) {
                toast.success(data.msg);
                setUemail("");
            } else {
                toast.error("Something went wrong");
            }

        } catch (err) {
            toast.error(err.response?.data?.msg || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Helmet>
                <title>Forget Password | QR App</title>
            </Helmet>

            <ToastContainer position="top-center" autoClose={2500} />

            <div className="bg-white shadow-lg p-6 rounded-lg w-[350px] text-center">
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={uemail}
                        onChange={(e) => setUemail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "RESET NOW"}
                    </button>
                </form>

                <p className="mt-4 text-sm">
                    Don’t have an account?
                    <Link to="/register" className="text-blue-500 ml-1 hover:underline">
                        Register
                    </Link>
                </p>

                <p className="mt-3 text-sm">
                    <Link to="/login" className="text-gray-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPass;
