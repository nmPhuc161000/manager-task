import React from 'react';
import MainLayout from '../layouts/MainLayout';
import '../styles/HomePage.css';
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/sampleData';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer'; // Import new Footer component

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

  const handlePlanNavigation = (planName) => {
    if (planName === 'Basic') {
      navigate('/login');
    } else if (planName === 'Standard' || planName === 'Premium') {
      navigate('/payment'); // Updated for Premium
    }
  };

  return (
    <MainLayout>
      <div className="pricing-page">
        <motion.section
          className="pricing-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants}>Simple Pricing Plans</motion.h2>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => {
              // Extract original price for discounts
              const originalPrice = plan.price.includes('was')
                ? plan.price.split('(')[1].replace(')', '')
                : null;

              return (
                <motion.div
                  key={index}
                  className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3>{plan.name}</h3>
                  <p
                    className="price"
                    data-original-price={originalPrice} // For strikethrough
                  >
                    {plan.price.split(' (')[0]} {/* Show current price */}
                  </p>
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
                        ? 'Pay Now'
                        : 'Subscribe Yearly'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </MainLayout>
  );
};

export default Pricing;