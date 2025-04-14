import React from 'react';
import HeaderDashboard from '../components/header/HeaderDashboard';

const PaymentLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <HeaderDashboard />
      <div className="layout-container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default PaymentLayout;