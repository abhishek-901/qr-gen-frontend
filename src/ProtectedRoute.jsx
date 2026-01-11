import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";   // 👈 v4 ka sahi import
import Navbar from "./Components/Navbar";

const ProtectedRoute = () => {
    const token = localStorage.getItem("utoken");

    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
            localStorage.removeItem("utoken");
            return <Navigate to="/login" replace />;
        }

        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    } catch {
        localStorage.removeItem("utoken");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
