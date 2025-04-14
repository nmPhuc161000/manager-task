import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';
import PaymentLayout from '../layouts/PaymentLayout';
import { viewAllSubscriptions } from '../apis/board-api';
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
    console.log('User Data:', { userId, token });

    const fetchSubscriptions = async () => {
      try {
        const response = await viewAllSubscriptions();
        console.log('Full API Response:', response);
        console.log('Response Data:', response.data);

        const subscriptionData = response.data.data || [];
        console.log('Subscription Data (before filtering):', subscriptionData);

        // Filter subscriptions: require ID, name, and price > 0
        const validSubscriptions = Array.isArray(subscriptionData)
          ? subscriptionData.filter((sub) => {
              const hasName = sub?.subcriptionName && typeof sub.subcriptionName === 'string';
              const hasId = sub?.id;
              const hasPrice = typeof sub?.price === 'number' && sub.price > 0;
              return hasId && hasName && hasPrice;
            })
          : [];

        console.log('Filtered Subscriptions:', validSubscriptions);
        setSubscriptions(validSubscriptions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscriptions:', err.response || err.message);
        setError('Failed to load subscriptions. Please try again.');
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  const handlePayNow = async (subscriptionId) => {
    if (!userId || !token) {
      alert('Please log in to proceed with payment.');
      navigate('/login', { state: { from: '/payment' } });
      return;
    }

    try {
      // Use subcriptionId to match API schema, add cancelUrl and returnUrl
      const paymentData = {
        subcriptionId: subscriptionId,
        userId,
        cancelUrl: `${window.location.origin}/payment`, // Redirect to Payment page on cancel
        returnUrl: `${window.location.origin}/dashboard`, // Redirect to Dashboard on success
      };
      console.log('Payment Payload:', paymentData);

      const response = await createNewPayment(paymentData);
      console.log('Payment Response:', response.data);
      const { paymentUrl } = response.data;

      if (paymentUrl && paymentUrl !== 'Subcription is not exist' && paymentUrl.startsWith('https://')) {
        window.location.href = paymentUrl;
      } else {
        console.error('Invalid payment URL:', paymentUrl);
        alert('Payment initiation failed: Invalid subscription or payment URL.');
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
    const numericPrice = Number(price) || 0;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(numericPrice);
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
                  (subscription.subcriptionName || '').toLowerCase().includes('standard')
                    ? 'highlighted'
                    : ''
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{subscription.subcriptionName || 'Unnamed Plan'}</h3>
                <p className="description">{subscription.description || 'No description available'}</p>
                <p className="price">{formatPrice(subscription.price)}</p>
                <button
                  className="cta-button"
                  onClick={() => handlePayNow(subscription.id)}
                  aria-label={`Pay for ${subscription.subcriptionName || 'plan'}`}
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