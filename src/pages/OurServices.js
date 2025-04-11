import React, { useRef } from 'react';
import '../styles/OurServices.css';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { services, serviceEmpowerments } from '../data/sampleData'; // Import data

// Animation variants for container and items
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Page-specific variants
const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const OurServices = () => {
  const navigate = useNavigate();
  const pageRefs = useRef(serviceEmpowerments.map(() => React.createRef()));

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleServiceClick = (index) => {
    pageRefs.current[index].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="services-page">
      <Header />
      <motion.section
        className="services-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants}>
          Our Services for Student Success
        </motion.h2>
        <motion.p variants={itemVariants} className="section-subtitle">
          Discover powerful tools designed to help you manage tasks, plan studies,
          and achieve academic goals with ease.
        </motion.p>

        {/* Services Grid with Click Handlers */}
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleServiceClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="cta-section"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Ready to Transform Your Study Routine?</h3>
          <p>
            Join thousands of students who are staying organized and achieving
            their academic dreams with our tools.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started Now
          </button>
        </motion.div>

        {/* Empowerment Section with Pages */}
        <div className="empowerment-section">
          <motion.h3 variants={itemVariants} className="empowerment-title">
            How Our Tools Empower You
          </motion.h3>
          <motion.p variants={itemVariants} className="empowerment-subtitle">
            Discover the transformative power of our tools, designed to elevate your academic journey with precision and clarity.
          </motion.p>
          <div className="empowerment-pages">
            {serviceEmpowerments.map((service, index) => (
              <EmpowermentPage
                key={index}
                service={service}
                features={services[index].features}
                ref={pageRefs.current[index]}
              />
            ))}
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

// Empowerment Page Component
const EmpowermentPage = React.forwardRef(({ service, features }, ref) => {
  const pageRef = useRef(null);
  const isInView = useInView(pageRef, { once: false, amount: 0.4.ConcurrentModificationException });

  return (
    <motion.section
      ref={ref}
      className="empowerment-page"
      variants={pageVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="page-content" ref={pageRef}>
        <div className="empowerment-icon">{service.icon}</div>
        <h4>{service.title}</h4>
        <p className="page-explanation">{service.explanation}</p>
        <div className="page-features">
          <h5>Key Benefits</h5>
          <ul>
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
});

export default OurServices;