import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Registered Successfully!");
        navigate("/login");
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
                <div className="register-circle">t</div>
            </div>
            <div className="register-form-wrapper">
                <h2>Sign Up To Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Comfirm Password" required />
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} className="link">
                        Sign In
                    </span>
                </p>
            </div>
        </motion.div>
    );
};

export default Register;
