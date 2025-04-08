import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/authme/Login";
import Register from "../pages/authme/Register";
import ForgotPassword from "../pages/authme/ForgotPassword";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import BoardDetails from "../pages/BoardDetails"; // Thêm import BoardDetails
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      {/* Đặt ToastContainer ngoài AnimatePresence */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board/:boardId" element={<BoardDetails />} /> {/* Thêm route cho BoardDetails */}
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRouter;