import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = () => {
    // Placeholder cho chức năng đăng nhập với Google
    console.log("Login with Google clicked");
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-logo">
        <div className="register-circle">t</div>
      </div>
      <div className="login-form-wrapper">
        <h2>Sign In To Your Account.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div class="options-container">
            <div class="remember-container">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember For 30 Days</label>
            </div>
            <a href="#" class="forgot-password">Forgot Password</a>
          </div>
          <div className="login-button">
            <button type="submit">Sign In</button>
          </div>
        </form>

        <p>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Sign Up
          </span>
        </p>

        <div className="divider">OR</div>
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="google-logo"
          />
          Sign In With Google
        </button>
      </div>
    </motion.div>
  );
};

export default Login;
