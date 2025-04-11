import React, { useState } from 'react';
import PaymentLayout from '../layouts/PaymentLayout';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Details Submitted:', paymentDetails);
        // Add payment processing logic here
    };

    return (
        <PaymentLayout>
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
                <h2>Payment Page</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            placeholder="Enter card number"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>CVV</label>
                        <input
                            type="password"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            placeholder="Enter CVV"
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Card Holder Name</label>
                        <input
                            type="text"
                            name="cardHolderName"
                            value={paymentDetails.cardHolderName}
                            onChange={handleChange}
                            placeholder="Enter card holder name"
                            required
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px' }}>
                        Submit Payment
                    </button>
                </form>
            </div>
        </PaymentLayout>
    );
};

export default Payment;