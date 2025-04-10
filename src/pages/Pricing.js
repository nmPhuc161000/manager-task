import React from 'react';
import '../styles/HomePage.css'; // Import the same CSS as HomePage
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/sampleData'; // Import pricingPlans
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Animation variants from HomePage
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Pricing = () => {
  const navigate = useNavigate();

  // Function to handle button clicks based on pricing plan (same as HomePage)
  const handlePlanNavigation = (planName) => {
    if (planName === 'Basic') {
      navigate('/login'); // Navigate to sign-in for free plan
    } else if (planName === 'Standard') {
      navigate('/payment'); // Navigate to payment for Standard plan
    } else if (planName === 'Contact Us') {
      navigate('/contact'); // Navigate to contact for Contact Us plan
    }
  };

  return (
    <div className="pricing-page">
      <motion.section
        className="pricing-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Changed to animate for full-page load
      >
        <motion.h2 variants={itemVariants}>Simple Pricing Plans</motion.h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className="cta-button"
                onClick={() => handlePlanNavigation(plan.name)}
              >
                {plan.name === 'Basic'
                  ? 'Get Started'
                  : plan.name === 'Standard'
                  ? 'Pay Now for Exclusive Price'
                  : 'Contact Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Pricing;