import React from 'react'
import "../../styles/StatusPayment.css";
import { Link } from 'react-router-dom';

export default function Successful() {
    return (
        <div className='container'>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <div className="mb-4">
                    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">Thank you for your payment. Your transaction was completed successfully.</p>
                <Link to="/dashboard" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}
