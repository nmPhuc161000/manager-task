import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown, faBell } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../UserAvatar"; // Import UserAvatar
import "../../styles/HeaderDashboard.css";

const HeaderDashboard = () => {
    return (
        <header className="header-dashboard">
            <div className="header-left">
                <Link to="/dashboard" className="logo">ProManage</Link>
                <div className="dropdown">
                    <span>Các Không gian làm việc</span>
                    <FontAwesomeIcon icon={faAngleDown} className="dropdown-arrow" />
                </div>
                <div className="dropdown">
                    <span>Gần đây</span>
                    <FontAwesomeIcon icon={faAngleDown} className="dropdown-arrow" />
                </div>
                <div className="dropdown">
                    <span>Đã đánh dấu sao</span>
                    <FontAwesomeIcon icon={faAngleDown} className="dropdown-arrow" />
                </div>
                <div className="dropdown">
                    <span>Mẫu</span>
                    <FontAwesomeIcon icon={faAngleDown} className="dropdown-arrow" />
                </div>
                <button className="create-button">Tạo mới</button>
            </div>
            <div className="header-right">
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input type="text" placeholder="Tìm kiếm" />
                </div>
                <FontAwesomeIcon icon={faBell} className="header-icon" />
                <UserAvatar />
            </div>
        </header>
    );
};

export default HeaderDashboard;
