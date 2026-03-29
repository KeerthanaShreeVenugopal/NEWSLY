import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;