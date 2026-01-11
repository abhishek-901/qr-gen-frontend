import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/userapi/reguser`,
                { name, email, password }
            );

            alert("Registered successfully");

            navigate("/login");
        } catch (err) {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
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
                    Register
                </button>
            </form>

            <p>
                Already have account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
