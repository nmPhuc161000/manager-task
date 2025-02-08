import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../assets/taskmanager.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import googleLogo from "../../assets/images/g-logo.png";
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
        <div className="login-circle">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      <div className="login-form-wrapper">
        <h2>Sign In To Your Account.</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div class="options-container">
            <div class="remember-container">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember For 30 Days</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
          <div className="login-button">
            <button type="submit">
              Login <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
            </button>
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
            src={googleLogo}
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
