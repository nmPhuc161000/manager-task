import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faUser,
  faLock,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import "../styles/ProductGuide.css";
import "react-toastify/dist/ReactToastify.css";

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProductGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  // Toggle FAQ-like sections
  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  // Extended guide sections based on provided code
  const guideSections = [
    {
      title: "Getting Started with Pro Manager",
      description:
        "Create your account and set up your workspace to start managing tasks efficiently.",
      steps: [
        "Navigate to the Sign Up page and enter your details (username, email, password, phone number).",
        "Verify your email with the OTP sent to your inbox.",
        "Log in to access your dashboard and start creating boards.",
        "Explore the dashboard to view recent boards and workspace options.",
      ],
      icon: faUser,
    },
    {
      title: "Creating and Managing Boards",
      description:
        "Organize your projects by creating boards, updating details, or archiving them when done.",
      steps: [
        "Click 'Create New Board' on the dashboard and fill in the title, description, and type (Board or Calendar).",
        "Use the edit icon to update board details like title or status.",
        "Archive boards using the archive icon to declutter your workspace.",
        "Access archived boards via 'View All Closed Boards' to restore or review.",
      ],
      icon: faCheckCircle,
    },
    {
      title: "Account Security and Recovery",
      description:
        "Keep your account secure and recover access if you forget your password.",
      steps: [
        "During login, use 'Remember Me' for 30-day access without re-login.",
        "If you forget your password, click 'Forgot Password' and enter your email to receive a reset token.",
        "Enter the token and a new password to regain access.",
        "Contact support at gmail:nguyenlmse171333@fpt.edu.vn if you encounter issues.",
      ],
      icon: faLock,
    },
    {
      title: "Upgrading Your Plan",
      description:
        "Unlock premium features to enhance your Pro Manager experience.",
      steps: [
        "From the dashboard, click the 'Upgrade' button to view pricing plans.",
        "Choose a plan and complete the secure payment process.",
        "Enjoy features like advanced board types, analytics, and team collaboration tools.",
        "Check your subscription status in the payment section.",
      ],
      icon: faCreditCard,
    },
    {
      title: "Using the API for Automation",
      description:
        "Integrate Pro Manager with your tools using our API for seamless automation.",
      steps: [
        "Visit http://promanager.me:8080/swagger/index.html to access the API documentation.",
        "Generate an API token from your account settings (available in premium plans).",
        "Use endpoints like /boards to create or manage boards programmatically.",
        "Test your integration with sample code provided below.",
      ],
      icon: faInfoCircle,
    },
  ];

  

  return (
    <MainLayout>
      <motion.section
        className="product-guide-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="guide-container">
          <motion.h1 variants={itemVariants}>Pro Manager Product Guide</motion.h1>
          <motion.p variants={itemVariants} className="guide-intro">
            Master Pro Manager to streamline your workflow, manage tasks, and
            boost productivity with this comprehensive guide.
          </motion.p>

          {/* Guide Sections */}
          <div className="guide-sections">
            {guideSections.map((section, index) => (
              <motion.div
                key={index}
                className={`guide-card ${
                  activeSection === index ? "active" : ""
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleSection(index)}
              >
                <div className="guide-card-header">
                  <FontAwesomeIcon
                    icon={section.icon}
                    className="guide-icon"
                  />
                  <h3>{section.title}</h3>
                </div>
                {activeSection === index && (
                  <motion.div
                    className="guide-card-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{section.description}</p>
                    <ul>
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="step-icon"
                          />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>


          {/* Troubleshooting Section */}
          <motion.div className="troubleshooting-section" variants={itemVariants}>
            <h3>Troubleshooting Common Issues</h3>
            <p>Quick solutions to common problems you might encounter:</p>
            <ul>
              <li>
                <strong>Forgot Password:</strong> Use the 'Forgot Password' link
                on the login page to reset your password via email.
              </li>
              <li>
                <strong>Email Verification Failed:</strong> Ensure you entered the
                correct email and check your spam folder for the OTP.
              </li>
              <li>
                <strong>Board Not Saving:</strong> Verify your internet connection
                and ensure all required fields (e.g., title) are filled.
              </li>
              <li>
                <strong>Payment Issues:</strong> Contact support at nguyenlmse171333@fpt.edu.vn
                for assistance with billing or subscription problems.
              </li>
            </ul>
          </motion.div>

          {/* Call to Action */}
          <motion.div className="cta-section" variants={itemVariants}>
            <h3>Ready to Dive In?</h3>
            <p>
              Start using Pro Manager or get help from our team for any
              questions.
            </p>
            <div className="cta-buttons">
              <button
                className="cta-button"
                onClick={() => navigate("/dashboard")}
                aria-label="Go to Dashboard"
              >
                Go to Dashboard
              </button>
              <a
                href="https://mail.google.com/mail/u/0/?pli=1#inbox"
                className="cta-button secondary"
                aria-label="Contact Support"
              >
                Contact Support
              </a>
              <a
                href="http://promanager.me:8080/swagger/index.html"
                className="cta-button secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View API Docs"
              >
                View API Docs
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default ProductGuide;