import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("utoken");
        try {
            await axios.get("http://localhost:5000/userapi/logoutuser", {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Logout Error:", error);
        } finally {
            localStorage.removeItem("utoken");
            navigate("/login");
        }
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard" className="text-white font-bold text-xl">
                    QR Link Generator
                </Link>

                <ul className="hidden md:flex space-x-6 text-white">
                    <li>
                        <Link to="/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/linkqr" className="hover:text-gray-300">
                            Add QR
                        </Link>
                    </li>
                    <li>
                        <Link to="/showqr" className="hover:text-gray-300">
                            List QR
                        </Link>
                    </li>
                    <li>
                        <button className="hover:text-gray-300" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>

                <button
                    className="text-white text-2xl md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <ul className="md:hidden bg-gray-800 text-white p-4 space-y-4 absolute left-0 w-full shadow-md">
                    <li>
                        <Link
                            to="/dashboard"
                            className="block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/linkqr"
                            className="block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Add QR
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/showqr"
                            className="block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            List QR
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="block py-2">
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
