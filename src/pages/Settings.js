import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/Settings.css";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <DashboardLayout>
      <div className="settings-container">
        <h2>Cài đặt</h2>
        <div className="settings-section">
          <h3>Giao diện</h3>
          <div className="theme-toggle">
            <label>Chế độ: {theme === "light" ? "Sáng" : "Tối"}</label>
            <button onClick={toggleTheme} className="toggle-button">
              Chuyển sang {theme === "light" ? "Tối" : "Sáng"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;