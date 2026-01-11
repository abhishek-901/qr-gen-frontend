import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/userapi/reguser`,
                { name, email, password },
                { withCredentials: true }
            );

            toast.success("Registered Successfully");

            // Redirect to login after register
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
        <>
            <ToastContainer />
            <div className="form-container">
                <h2>Registration</h2>

                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p>
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </div>
        </>
    );
};

export default Register;
