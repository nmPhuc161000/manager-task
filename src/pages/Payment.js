// src/components/Payment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';
import PaymentLayout from '../layouts/PaymentLayout';
import { viewAllSubscriptions } from '../apis/board-api'; // Corrected import
import { createNewPayment } from '../apis/payment-api';
import { motion } from 'framer-motion';

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

const Payment = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token') || null;

  useEffect(() => {
    // Log user data
    console.log('User Data:', {
      userId,
      token,
    });

    const fetchSubscriptions = async () => {
      try {
        const response = await viewAllSubscriptions();
        const subscriptionData = response.data.data || [];
        setSubscriptions(subscriptionData);
        // Log subscription data
        console.log('Subscription Data:', subscriptionData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load subscriptions. Please try again.');
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handlePayNow = async (subscriptionId) => {
    if (!userId) {
      alert('Please log in to proceed with payment.');
      navigate('/login', { state: { from: '/payment' } });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('subscriptionId', subscriptionId);
      formData.append('userId', userId);

      const response = await createNewPayment(formData);
      const { paymentUrl } = response.data;

      if (paymentUrl && paymentUrl !== 'Subcription is not exist') {
        window.location.href = paymentUrl;
      } else {
        alert('Payment initiation failed: Invalid subscription.');
      }
    } catch (err) {
      console.error('Payment error:', err.response?.data || err.message);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price ); // Divide by 1000 as per original logic
  };

  if (loading) {
    return (
      <PaymentLayout>
        <section className="payment-section">
          <div className="payment-container">
            <p>Loading subscriptions...</p>
          </div>
        </section>
      </PaymentLayout>
    );
  }

  if (error) {
    return (
      <PaymentLayout>
        <section className="payment-section">
          <div className="payment-container">
            <p>{error}</p>
            <button className="back-button" onClick={handleBack} aria-label="Go back">
              ←
            </button>
          </div>
        </section>
      </PaymentLayout>
    );
  }

  if (!subscriptions.length) {
    return (
      <PaymentLayout>
        <section className="payment-section">
          <div className="payment-container">
            <p>No subscriptions available.</p>
            <button className="back-button" onClick={handleBack} aria-label="Go back">
              ←
            </button>
          </div>
        </section>
      </PaymentLayout>
    );
  }

  return (
    <PaymentLayout>
      <section className="payment-section">
        <motion.div
          className="payment-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="back-button-container">
            <button
              className="back-button"
              onClick={handleBack}
              aria-label="Go back"
            >
              ←
            </button>
          </div>
          <motion.h2 variants={itemVariants}>Simple Pricing Plans</motion.h2>
          <div className="subscriptions-grid">
            {subscriptions.map((subscription) => (
              <motion.div
                key={subscription.id}
                className={`subscription-card ${
                  subscription.subcriptionName.toLowerCase().includes('standard')
                    ? 'highlighted'
                    : ''
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{subscription.subcriptionName}</h3>
                <p className="description">{subscription.description}</p>
                <p className="price">{formatPrice(subscription.price)}</p>
                <button
                  className="cta-button"
                  onClick={() => handlePayNow(subscription.id)}
                  aria-label={`Pay for ${subscription.subcriptionName}`}
                >
                  Pay Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </PaymentLayout>
  );
};

export default Payment;