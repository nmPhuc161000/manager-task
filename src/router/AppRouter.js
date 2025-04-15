// src/router/AppRouter.js
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/authme/Login";
import Register from "../pages/authme/Register";
import ForgotPassword from "../pages/authme/ForgotPassword";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import BoardDetails from "../pages/BoardDetails";
import ProductGuide from "../pages/ProductGuide";
import Pricing from "../pages/Pricing";
import OurServices from "../pages/OurServices";
import AboutUs from "../pages/AboutUs";
import { ErrorProvider } from "../contexts/ErrorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../pages/Payment";
import Settings from "../pages/Settings";
import Successful from "../pages/status_payment/Successful";
import Cancel from "../pages/status_payment/Cancel";
import ProtectedRoute from "./ProtectedRoute"; // Đảm bảo import đúng đường dẫn

const AppRouter = () => {
  const location = useLocation();

  return (
    <ErrorProvider>
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
          <Route path="/board/:boardId" element={<BoardDetails />} />
          <Route path="/product-guide" element={<ProductGuide />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/settings" element={<Settings />} />
          <Route
                        path="/dashboard"
                        element={<ProtectedRoute element={<Dashboard />} />}
                    />
                    <Route
                        path="/board/:boardId"
                        element={<ProtectedRoute element={<BoardDetails />} />}
                    />
                    <Route
                        path="/payment"
                        element={<ProtectedRoute element={<Payment />} />}
                    />
                    <Route
                        path="/payment/successful"
                        element={<Successful />}
                    />
                    <Route
                        path="/payment/cancel"
                        element={<Cancel />}
                    />
        </Routes>
      </AnimatePresence>
    </ErrorProvider>
  );
 
};

export default AppRouter;