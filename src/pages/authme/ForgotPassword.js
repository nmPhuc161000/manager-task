import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import "../../styles/ForgotPassword.css"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <motion.div
      className="forgot-password-container"
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -100 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <h2>Forgot Password</h2>
      <p>Enter your email to reset your password</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Send Reset Link</button>
      </form>
      <button onClick={() => navigate("/login")}>Back to Login</button>
    </motion.div>
  );
};

export default ForgotPassword;