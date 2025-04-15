import { Navigate } from "react-router-dom";

// Hàm kiểm tra trạng thái đăng nhập
const isAuthenticated = () => {
    // Thay bằng logic kiểm tra thực tế, ví dụ: kiểm tra token trong localStorage hoặc state
    return !!localStorage.getItem("token"); // Ví dụ: kiểm tra token
};

const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;