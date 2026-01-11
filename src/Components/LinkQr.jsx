import React, { useRef, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { QRCodeCanvas } from 'qrcode.react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

const LinkQr = () => {
    const { id } = useParams()   // id milega agar edit ho
    const navigate = useNavigate()

    const [qrLink, setQrLink] = useState("")
    const [qrColor, setQrColor] = useState("#000000")
    const [loading, setLoading] = useState(false)

    const qRef = useRef()

    // ===== Fetch QR for Edit Mode =====
    useEffect(() => {
        if (id) fetchQR()
    }, [id])

    const fetchQR = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("utoken")
            const { data } = await axios.get(
                `http://localhost:5000/userapi/getqr/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setQrLink(data.qr.qrlink)
            setQrColor(data.qr.qrcolor)
        } catch (err) {
            toast.error("Failed to load QR for edit")
        } finally {
            setLoading(false)
        }
    }

    // ===== Download QR =====
    const downLoadQr = () => {
        const canvas = qRef.current.querySelector("canvas")
        if (!canvas) return
        const url = canvas.toDataURL("image/png")
        const a = document.createElement("a")
        a.href = url
        a.download = "qrcode.png"
        a.click()
        toast.success("QR Downloaded!")
    }

    // ===== Save or Update QR =====
    const handleSave = async () => {
        const utoken = localStorage.getItem("utoken")
        if (!utoken) {
            toast.error("Please login first!")
            return
        }
        if (!qrLink) {
            toast.error("Please enter a URL!")
            return
        }

        try {
            if (id) {
                // === EDIT MODE ===
                await axios.put(
                    `http://localhost:5000/userapi/editqr/${id}`,
                    { qrlink: qrLink, qrcolor: qrColor },
                    { headers: { Authorization: `Bearer ${utoken}` } }
                )
                toast.success("QR Updated Successfully!")
            } else {
                // === ADD MODE ===
                await axios.post(
                    'http://localhost:5000/userapi/addlinkqr',
                    { qrlink: qrLink, qrcolor: qrColor },
                    { headers: { Authorization: `Bearer ${utoken}` } }
                )
                toast.success("QR Saved Successfully!")
            }

            setTimeout(() => navigate("/showqr"), 1500) // redirect to All QR page
        } catch (error) {
            toast.error(error.response?.data?.msg || "Operation Failed!")
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin h-10 w-10 border-b-2 border-gray-700 rounded-full"></div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <Helmet>
                <title>{id ? "Edit QR" : "Generate URL QR"}</title>
            </Helmet>

            <ToastContainer />

            <h1 className='text-2xl font-bold mb-4'>
                {id ? "Edit QR" : "Generate URL QR"}
            </h1>

            <input
                type="text"
                placeholder='Enter Your URL Here'
                className='mb-2 p-2 border rounded w-80'
                value={qrLink}
                onChange={(e) => setQrLink(e.target.value)}
            />

            <label className="mb-1 text-gray-700 font-medium">Select QR Color:</label>
            <input
                type="color"
                className="mb-4"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
            />

            <div ref={qRef} className='bg-white p-2 rounded-lg shadow-lg'>
                <QRCodeCanvas
                    value={qrLink || " "}
                    size={300}
                    fgColor={qrColor}
                    includeMargin={true}
                />
            </div>

            <div className='mt-4 flex gap-4'>
                <button
                    className='px-4 py-2 w-36 bg-green-600 text-white hover:bg-green-900 transition hover:cursor-pointer border rounded'
                    onClick={handleSave}
                >
                    {id ? "Update QR" : "Save QR"}
                </button>

                <button
                    className='px-4 py-2 w-36 bg-blue-600 text-white hover:bg-blue-900 transition hover:cursor-pointer border rounded'
                    onClick={downLoadQr}
                >
                    Download
                </button>
            </div>
        </div>
    )
}

export default LinkQr
