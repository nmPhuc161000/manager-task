import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faArrowRight, faPhone, faSpinner } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../assets/taskmanager.json";
import Lottie from "lottie-react";
import "../../styles/Register.css";
import { register } from "../../apis/authentication-api";
import VerifyEmail from "../../components/VerifyEmail";
import { toast } from "react-toastify"; // Import toast từ react-toastify

const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        passwordHash: "",
        confirmPassword: "",
        phoneNo: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpPopup, setShowOtpPopup] = useState(false); // State để hiển thị popup OTP
    const [registeredEmail, setRegisteredEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if (!formData.userName || !formData.email || !formData.passwordHash || !formData.confirmPassword || !formData.phoneNo) {
            toast.error("Please check your input!"); 
            setIsLoading(false);
            return;
        }
        if (formData.passwordHash !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }
        const data = {
            userName: formData.userName,
            email: formData.email,
            passwordHash: formData.passwordHash,
            phoneNo: formData.phoneNo
        }
        setIsLoading(true);
        try {
            const response = await register(data);
            console.log("Data: ", response);
            toast.success(response.data?.message); 
            // Hiển thị popup OTP và lưu email đã đăng ký
            setRegisteredEmail(formData.email);
            setShowOtpPopup(true);
        } catch (error) {
            const responseData = JSON.parse(error.response?.request?.response || "{}");
            toast.error(responseData?.message || "An error occurred while registering."); 
            setIsLoading(false);
            console.error("An error occurred while sending the API request:", error);
        }
    };

    const handleRegisterCircleClick = () => {
        navigate("/");
    };

    const handleVerifySuccess = () => {
        // Xử lý khi xác thực OTP thành công
        setShowOtpPopup(false); // Ẩn popup OTP
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
    };

    const handleCancelVerify = () => {
        // Xử lý khi hủy bỏ xác thực OTP
        setIsLoading(false);
        setShowOtpPopup(false); // Ẩn popup OTP
    };

    return (
        <motion.div
            className="register-container"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <div className="register-logo">
                <div className="register-circle" onClick={handleRegisterCircleClick}>
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </div>
            <div className="register-form-wrapper">
                <h2>Sign Up To Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
                        <input
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            name="passwordHash"
                            placeholder="Password"
                            value={formData.passwordHash}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faPhone} className="input-icon" />
                        <input
                            type="number"
                            name="phoneNo"
                            placeholder="Phone Number"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
                            </>
                        ) : (
                            <>
                                Register <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                            </>
                        )}
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="link">
                        Sign In
                    </span>
                </p>
            </div>
            {/* Hiển thị popup OTP nếu showOtpPopup là true */}
            {showOtpPopup && (
                <VerifyEmail
                    email={registeredEmail}
                    onVerifySuccess={handleVerifySuccess}
                    onCancel={handleCancelVerify}
                />
            )}
        </motion.div>
    );
};

export default Register;