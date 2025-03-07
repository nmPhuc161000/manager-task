import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../apis/authentication-api";
import "../styles/VerifyEmail.css";

const VerifyEmail = ({ email, onVerifySuccess, onCancel }) => {
    const [otp, setOtp] = useState(""); // State để lưu OTP nhập từ người dùng
    const [isLoading, setIsLoading] = useState(false); // State để quản lý trạng thái loading
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            otp: otp
        }
        console.log(data);

        try {
            // Gọi API để xác thực OTP
            const response = await verifyOtp(data);
            console.log("OTP verification response:", response);

            // Nếu xác thực thành công, gọi callback `onVerifySuccess`
            alert("Email verified successfully!");
            onVerifySuccess();
            navigate("/login");
        } catch (error) {
            alert("Invalid OTP. Please try again.");
            console.error("An error occurred while sending the API request:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="otp-popup-overlay">
            <div className="otp-popup">
                <h3>Verify Your Email</h3>
                <p>We have sent an OTP to your email: <strong>{email}</strong></p>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={isLoading}
                />
                <button onClick={handleVerifyOtp} disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
                <button onClick={onCancel} disabled={isLoading}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;