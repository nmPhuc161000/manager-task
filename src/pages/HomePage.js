// pages/HomePage.jsx
import { motion } from "framer-motion";

// MainLayout Component (Integrated)
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      {/* Header/Navigation */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">Pro Manager</div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content (Passed via children) */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Pro Manager. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

// Animation Variants
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

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// HomePage Component
const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>
          Manage Your Tasks with Ease
        </motion.h1>
        <motion.p variants={itemVariants}>
          Organize, track, and succeed with our intuitive task management tool.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          className="cta-button"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>Why Choose Us?</motion.h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              whileHover={{ y: -10, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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

      {/* Pricing Overview Section */}
      <motion.section
        className="pricing-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>Simple Pricing Plans</motion.h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.highlighted ? "highlighted" : ""}`}
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
              <button className="cta-button">Choose Plan</button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
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

      {/* Call to Action Section */}
      <motion.section
        className="cta-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants}>
          Ready to Boost Your Productivity?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          className="cta-button"
        >
          Sign Up Now
        </motion.button>
      </motion.section>
    </MainLayout>
  );
};

// Sample Data
const features = [
  {
    title: "Task Organization",
    description: "Easily categorize and prioritize tasks with drag-and-drop functionality.",
  },
  {
    title: "Collaboration",
    description: "Work seamlessly with your team with shared tasks and real-time updates.",
  },
  {
    title: "Progress Tracking",
    description: "Visualize your progress with charts and reminders to stay on track.",
  },
];

const testimonials = [
  {
    quote: "Pro Manager has transformed the way our team works. We've never been more organized!",
    author: "Jane Doe",
    role: "Project Manager",
  },
  {
    quote: "The intuitive design and real-time updates make task management a breeze.",
    author: "John Smith",
    role: "Freelancer",
  },
  {
    quote: "I love the progress tracking feature—it keeps me motivated every day.",
    author: "Emily Johnson",
    role: "Entrepreneur",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "$0/month",
    features: ["Up to 5 projects", "Basic task management", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99/month",
    features: ["Unlimited projects", "Advanced collaboration", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: ["Custom solutions", "Dedicated account manager", "24/7 support"],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "What is Pro Manager?",
    answer: "Pro Manager is a task management tool designed to help individuals and teams organize, track, and complete tasks efficiently.",
  },
  {
    question: "Can I use Pro Manager for free?",
    answer: "Yes! We offer a free Basic plan with essential features to get you started.",
  },
  {
    question: "How does the collaboration feature work?",
    answer: "Our collaboration feature allows you to share tasks, assign them to team members, and get real-time updates on progress.",
  },
  {
    question: "Is my data secure with Pro Manager?",
    answer: "Absolutely. We use industry-standard encryption to ensure your data is safe and secure.",
  },
];

// CSS Embedded in the File
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f5f7fa;
    color: #333;
  }

  .main-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header Styles */
  .header {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #6e8efb;
  }

  .nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
  }

  .nav-links li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-links li a:hover {
    color: #6e8efb;
  }

  /* Hero Section */
  .hero-section {
    text-align: center;
    padding: 100px 20px;
    background: linear-gradient(135deg, #6e8efb 0%, #a777e3 100%);
    color: white;
    border-radius: 0 0 50px 50px;
  }

  .hero-section h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .hero-section p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    opacity: 0.9;
  }

  .cta-button {
    padding: 15px 30px;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background-color: #ff6f61;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .cta-button:hover {
    background-color: #e65a50;
  }

  /* Features Section */
  .features-section {
    padding: 80px 20px;
    text-align: center;
    background-color: #ffffff;
  }

  .features-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: #f9f9f9;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .feature-card p {
    font-size: 1rem;
    color: #666;
  }

  /* Testimonials Section */
  .testimonials-section {
    padding: 80px 20px;
    text-align: center;
    background-color: #f5f7fa;
  }

  .testimonials-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .testimonial-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .testimonial-card p {
    font-style: italic;
    color: #666;
    margin-bottom: 20px;
  }

  .testimonial-card h4 {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .testimonial-card span {
    font-size: 0.9rem;
    color: #999;
  }

  /* Pricing Section */
  .pricing-section {
    padding: 80px 20px;
    text-align: center;
    background-color: #ffffff;
  }

  .pricing-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .pricing-card {
    background: #f9f9f9;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }

  .pricing-card.highlighted {
    background: #6e8efb;
    color: white;
    transform: scale(1.05);
  }

  .pricing-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    font-weight: 600;
  }

  .pricing-card .price {
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: 700;
  }

  .pricing-card ul {
    list-style: none;
    margin-bottom: 20px;
  }

  .pricing-card ul li {
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .pricing-card .cta-button {
    background-color: #ff6f61;
    color: white;
  }

  .pricing-card.highlighted .cta-button {
    background-color: #ffffff;
    color: #6e8efb;
  }

  /* FAQ Section */
  .faq-section {
    padding: 80px 20px;
    text-align: center;
    background-color: #f5f7fa;
  }

  .faq-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .faq-list {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
  }

  .faq-item {
    background: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .faq-item h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .faq-item p {
    font-size: 1rem;
    color: #666;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 80px 20px;
    background-color: #ffffff;
    border-top: 1px solid #eee;
  }

  .cta-section h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    font-weight: 700;
  }

  /* Footer Styles */
  .footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 30px 20px;
    margin-top: auto;
  }

  .footer p {
    margin-bottom: 10px;
    font-size: 0.9rem;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .footer-links a {
    color: #dfe6e9;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #6e8efb;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .navbar {
      padding: 15px 20px;
      flex-direction: column;
      gap: 10px;
    }

    .nav-links {
      flex-direction: column;
      gap: 10px;
    }

    .hero-section h1 {
      font-size: 2.5rem;
    }

    .features-section h2,
    .testimonials-section h2,
    .pricing-section h2,
    .faq-section h2,
    .cta-section h2 {
      font-size: 1.8rem;
    }

    .cta-button {
      padding: 12px 25px;
      font-size: 1rem;
    }

    .pricing-card.highlighted {
      transform: scale(1);
    }
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default HomePage;