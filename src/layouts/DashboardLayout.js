import React from 'react';
import HeaderDashboard from '../components/header/HeaderDashboard';
import Sidebar from '../components/Sidebar';
import '../styles/DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <HeaderDashboard />
            <div className="dashboard-content">
                <Sidebar />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout; 