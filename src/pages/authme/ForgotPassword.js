import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { forgotPassword, resetPassword } from "../../apis/authentication-api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const data = {
      EmailOrPhoneNumber: email,
    };
    setIsLoadingEmail(true);
    setSuccessMessage("");
    try {
      const response = await forgotPassword(data);
      setSuccessMessage(response.data?.message || "Token sent successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = {
      token: token,
      newPassword: newPassword,
    };
    setIsLoadingReset(true);
    try {
      const response = await resetPassword(data);
      alert(response.data?.message || "Password reset successfully!");
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please check your token.");
    } finally {
      setIsLoadingReset(false);
    }
  };

  return (
    <motion.div
      className="forgot-password-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2>Forgot Password</h2>

      {/* Form 1: Gửi email */}
      <form onSubmit={handleSendEmail} className="form-section">
        <p>Enter your email to receive a reset token</p>
        <div className="input-button-wrapper">
          <div className="input-wrapper">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="send-button" disabled={isLoadingEmail}>
            {isLoadingEmail ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Send...
              </>
            ) : (
              <>
                Send <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </>
            )}
          </button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>

      {/* Form 2: Reset password */}
      <form onSubmit={handleResetPassword} className="form-section">
        <p>Enter your token and new password</p>
        <div className="input-wrapper">
          <span className="input-icon">🔑</span>
          <input
            type="text"
            placeholder="Enter your token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="reset-button" disabled={isLoadingReset}>
          {isLoadingReset ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin /> Resetting...
            </>
          ) : (
            <>
              Reset <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
            </>
          )}
        </button>
      </form>

      <button onClick={() => navigate("/login")} className="back-button">
        Back to Login
      </button>
    </motion.div>
  );
};

export default ForgotPassword;