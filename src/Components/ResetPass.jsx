import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPass = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error("Enter new password");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `http://localhost:5000/userapi/reset-pass/${token}`,
                { password }
            );

            if (res.data.resets === "0") {
                toast.success(res.data.msg);
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(res.data.msg || "Invalid or expired link");
            }

        } catch (err) {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <ToastContainer />

            <div className="bg-white shadow-lg p-6 rounded-lg w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Set New Password Now!!</h2>

                <input
                    type="password"
                    placeholder="Enter New Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Updating..." : "RESET NOW"}
                </button>
            </div>
        </div>
    );
};

export default ResetPass;
