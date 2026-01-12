import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import "react-toastify/dist/ReactToastify.css";

const AllLinqQR = () => {
    const [qrlinks, setQrlinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchQrlinks = async () => {
        try {
            const token = localStorage.getItem("utoken");
            const { data } = await axios.get("http://localhost:5000/userapi/getqrlinks", {
                headers: { Authorization: `Bearer ${token}` }
            });
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
                headers: { Authorization: `Bearer ${token}` }
            });

            setQrlinks(prev => prev.filter(qr => qr._id !== id));
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
        <div className="min-h-screen bg-gray-100 p-4">
            <ToastContainer position="top-center" autoClose={2000} />

            <h2 className="text-2xl font-bold text-center mb-6">My QR Links</h2>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white rounded-lg shadow">
                <div className="grid grid-cols-4 bg-slate-800 text-white p-4 font-semibold text-center">
                    <div>QR</div>
                    <div>Color</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {qrlinks.map(qr => (
                    <div
                        key={qr._id}
                        className="grid grid-cols-4 items-center text-center p-4 border-b hover:bg-gray-50"
                    >
                        <div className="flex justify-center">
                            <QRCodeCanvas value={qr.qrlink} size={70} fgColor={qr.qrcolor} />
                        </div>
                        <div className="font-mono">{qr.qrcolor}</div>
                        <div>{qr.qr_status}</div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(qr._id)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDelete(qr._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {qrlinks.map(qr => (
                    <div key={qr._id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-center mb-3">
                            <QRCodeCanvas value={qr.qrlink} size={100} fgColor={qr.qrcolor} />
                        </div>

                        <p className="text-center text-sm text-gray-600 break-all">
                            {qr.qrlink}
                        </p>

                        <div className="flex justify-between mt-3 text-sm">
                            <span className="font-mono">{qr.qrcolor}</span>
                            <span>{qr.qr_status}</span>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button onClick={() => handleEdit(qr._id)} className="bg-blue-600 text-white px-4 py-1 rounded w-1/2 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(qr._id)} className="bg-red-600 text-white px-4 py-1 rounded w-1/2">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {qrlinks.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No QR Links Found</p>
            )}
        </div>
    );
};

export default AllLinqQR;
