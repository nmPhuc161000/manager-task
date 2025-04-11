import React from 'react';
import '../styles/AboutUs.css';
import { motion } from 'framer-motion';
import { aboutUsData } from '../data/sampleData';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

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

const AboutUs = () => {

  return (
    <div className="about-us-page">
      <Header />
      <motion.section
        className="about-header"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>About Us</motion.h1>
        <motion.p variants={itemVariants}>
          Learn more about the team behind Pro Manager.
        </motion.p>
      </motion.section>

      <motion.section
        className="mission-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>Our Mission</motion.h2>
        <motion.p variants={itemVariants}>{aboutUsData.mission}</motion.p>
      </motion.section>

      <motion.section
        className="duty-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>Our Duty</motion.h2>
        <motion.p variants={itemVariants}>{aboutUsData.duty}</motion.p>
      </motion.section>

      <motion.section
        className="team-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>Our Team</motion.h2>
        <div className="team-grid">
          {aboutUsData.team.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
            >
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutUs;