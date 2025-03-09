import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import animationData from "../../assets/taskmanager.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleLogo from "../../assets/images/g-logo.png";
import { jwtDecode } from "jwt-decode";
import { login } from "../../apis/authentication-api";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please check input");
      setIsLoading(false);
      return;
    }
    const data = {
      email: email,
      passwordHash: password,
    };

    console.log(data);

    setIsLoading(true);
    try {
      const response = await login(data);

      console.log("Data: ", response);

      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
      console.log("Token: ", token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      localStorage.setItem("role", role);
      console.log("decode: ", decodedToken);

      const full_name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      localStorage.setItem("full_name", full_name);

      localStorage.setItem("userId", decodedToken.id);

      // Chỉ lưu thông báo vào localStorage, không gọi toast ở đây
      localStorage.setItem("loginMessage", response.data.message || "Login successful!");

      // Chuyển ngay sang dashboard
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      const responseData = JSON.parse(error.response?.request?.response || "{}");
      toast.error(responseData.message || "An error occurred!");
      setIsLoading(false);
      console.error("An error occurred while sending the API request:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google clicked");
  };

  const handleLoginCircleClick = () => {
    navigate("/");
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
        <div className="login-circle" onClick={handleLoginCircleClick}>
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
          <div className="options-container">
            <div className="remember-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember For 30 Days</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
          <div className="login-button">
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
                </>
              ) : (
                <>
                  Login <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </>
              )}
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
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          Sign In With Google
        </button>
      </div>
    </motion.div>
  );
};

export default Login;