import React from 'react';
import '../styles/OurServices.css'; // Updated CSS file for new content
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

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

// Sample data for services (unchanged)
const services = [
  {
    title: 'Task Organization',
    description:
      'Easily create, categorize, and prioritize tasks for assignments, projects, and exams. Set due dates and get reminders to stay on top of deadlines.',
    icon: '📋',
    features: [
      'Custom task categories (e.g., Math, Literature)',
      'Drag-and-drop prioritization',
      'Recurring task support for weekly study sessions',
    ],
  },
  {
    title: 'Study Planner',
    description:
      'Build personalized study schedules that align with your academic goals. Break down complex subjects into manageable study sessions.',
    icon: '📅',
    features: [
      'Weekly and monthly planner views',
      'Smart scheduling based on deadlines',
      'Integration with calendar apps',
    ],
  },
  {
    title: 'Progress Tracking',
    description:
      'Monitor your academic progress with visual dashboards. Track completed tasks, grades, and study hours to stay motivated.',
    icon: '📊',
    features: [
      'Interactive progress charts',
      'Grade tracking per subject',
      'Milestone celebrations for motivation',
    ],
  },
  {
    title: 'Resource Hub',
    description:
      'Access a curated library of study resources, including templates, guides, and note-taking tools tailored for students.',
    icon: '📚',
    features: [
      'Note-taking templates for lectures',
      'Flashcard creator for quick reviews',
      'Links to trusted academic resources',
    ],
  },
  {
    title: 'Focus Mode',
    description:
      'Boost productivity with a distraction-free focus mode. Use Pomodoro timers and block notifications during study sessions.',
    icon: '⏱️',
    features: [
      'Customizable Pomodoro intervals',
      'Website and app blocker integration',
      'Session analytics to improve focus',
    ],
  },
  {
    title: 'Goal Setting',
    description:
      'Set short-term and long-term academic goals. Break them into actionable steps and receive guidance to achieve them.',
    icon: '🎯',
    features: [
      'SMART goal templates',
      'Progress checkpoints',
      'Motivational reminders',
    ],
  },
];

// New explanatory content for each service (below)
const serviceEmpowerments = [
  {
    title: 'Task Organization',
    explanation:
      'Streamline your academic responsibilities with a system that transforms chaos into order, ensuring no deadline slips through the cracks and every priority is crystal clear.',
    icon: '📋',
  },
  {
    title: 'Study Planner',
    explanation:
      'Master your time with a tailored roadmap that optimizes your study efforts, aligning every hour with your ambitions for maximum efficiency and success.',
    icon: '📅',
  },
  {
    title: 'Progress Tracking',
    explanation:
      'Gain clarity on your academic journey with insights that highlight your achievements, empowering you to refine strategies and excel with confidence.',
    icon: '📊',
  },
  {
    title: 'Resource Hub',
    explanation:
      'Elevate your learning with a centralized arsenal of high-quality tools, designed to enhance comprehension and accelerate your path to mastery.',
    icon: '📚',
  },
  {
    title: 'Focus Mode',
    explanation:
      'Unlock peak productivity by creating an environment where concentration thrives, turning every study session into a powerhouse of progress.',
    icon: '⏱️',
  },
  {
    title: 'Goal Setting',
    explanation:
      'Achieve academic excellence by defining clear objectives and following a structured path, supported by tools that keep your aspirations within reach.',
    icon: '🎯',
  },
];

const OurServices = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup'); // Navigate to signup page for call-to-action
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

        {/* Services Grid (Unchanged) */}
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
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

        {/* Call to Action (Unchanged) */}
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

        {/* New Empowerment Section (Below) */}
        <motion.div className="empowerment-section" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>
            How Our Tools Empower You
          </motion.h3>
          <div className="empowerment-grid">
            {serviceEmpowerments.map((service, index) => (
              <motion.div
                key={index}
                className="empowerment-card"
                variants={itemVariants}
                whileHover={{ boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="empowerment-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.explanation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default OurServices;