import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllLinqQR = () => {
    const [qrlinks, setQrlinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchQrlinks = async () => {
        try {
            const token = localStorage.getItem("utoken");
            const { data } = await axios.get(
                "http://localhost:5000/userapi/getqrlinks",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setQrlinks(data.qrlinks || []);
        } catch {
            toast.error("Failed to load QR");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQrlinks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this QR?")) return;

        try {
            const token = localStorage.getItem("utoken");
            await axios.delete(`http://localhost:5000/userapi/deleteqr/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setQrlinks((prev) => prev.filter((qr) => qr._id !== id));
            toast.success("QR Deleted");
        } catch {
            toast.error("Delete Failed");
        }
    };

    const handleEdit = (id) => {
        navigate(`/linkqr/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin h-10 w-10 border-b-2 border-gray-700 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
            <ToastContainer position="top-center" autoClose={2000} />

            {/* Centered narrow container */}
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-6">
                    My QR Links
                </h2>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Desktop Header */}
                    <div className="hidden md:grid grid-cols-4 bg-slate-800 text-white text-center font-semibold p-3">
                        <div>QR</div>
                        <div>Color</div>
                        <div>Status</div>
                        <div>Actions</div>
                    </div>

                    {/* QR Rows */}
                    {qrlinks.map((qr) => (
                        <div
                            key={qr._id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-center p-4 border-b hover:bg-gray-50"
                        >
                            {/* QR */}
                            <div className="flex justify-center">
                                <img
                                    className="h-20 w-20 border rounded"
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${qr.qrlink}&color=${qr.qrcolor.replace(
                                        "#",
                                        ""
                                    )}`}
                                    alt="qr"
                                />
                            </div>

                            {/* Color */}
                            <div className="font-mono text-sm">{qr.qrcolor}</div>

                            {/* Status */}
                            <div className="capitalize font-semibold text-gray-700">
                                {qr.qr_status}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(qr._id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(qr._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {qrlinks.length === 0 && (
                        <p className="text-center p-6 text-gray-500">
                            No QR Links Found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllLinqQR;
