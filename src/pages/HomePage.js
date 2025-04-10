import React from 'react';
import '../styles/HomePage.css';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { features, testimonials, pricingPlans, faqs } from '../data/sampleData';
import { useNavigate } from 'react-router-dom';

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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle button clicks based on pricing plan
  const handlePlanNavigation = (planName) => {
    if (planName === 'Basic') {
      navigate('/login'); // Navigate to sign-in for free plan
    } else if (planName === 'Standard') { // Updated from 'Pro'
      navigate('/payment'); // Navigate to payment for Standard plan
    } else if (planName === 'Contact Us') { // Updated to match current data
      navigate('/contact'); // Navigate to contact for Contact Us plan
    }
  };

  return (
    <MainLayout>
      <motion.section className="hero-section" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 variants={itemVariants}>Manage Your Tasks with Ease</motion.h1>
        <motion.p variants={itemVariants}>
          Organize, track, and succeed with our intuitive task management tool.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          className="cta-button"
          onClick={() => navigate('/register')}
        >
          Get Started
        </motion.button>
      </motion.section>

      <motion.section className="features-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 variants={itemVariants}>Why Choose Us?</motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ y: -10, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="testimonials-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 variants={itemVariants}>What Our Users Say</motion.h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <p>"{testimonial.quote}"</p>
              <h4>{testimonial.author}</h4>
              <span>{testimonial.role}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="pricing-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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
                  ? 'Pay Now for Exclusive Price' // Updated text for Standard plan
                  : 'Contact Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="faq-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 variants={itemVariants}>Frequently Asked Questions</motion.h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
            >
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="cta-section" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.h2 variants={itemVariants}>Ready to Boost Your Productivity?</motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          className="cta-button"
          onClick={() => navigate('/register')}
        >
          Sign Up Now
        </motion.button>
      </motion.section>
    </MainLayout>
  );
};

export default HomePage;