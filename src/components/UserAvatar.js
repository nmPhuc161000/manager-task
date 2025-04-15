import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/UserAvatar.css";

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Tạo ref để theo dõi dropdown
  const email = localStorage.getItem('email');
  const userName = localStorage.getItem('userName');

  const user = {
    name: userName,
    email: email,
    initials: email?.match(/[a-zA-Z]/g)?.slice(0, 2).join('').toUpperCase() || email?.charAt(0).toUpperCase(),
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Hàm xử lý khi nhấp ra ngoài
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Thêm và xóa sự kiện click khi component mount/unmount
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="user-avatar" ref={dropdownRef}>
      <div className="avatar-initials" onClick={toggleDropdown}>
        {user.initials}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {/* Phần Tài khoản */}
          <div className="dropdown-section account-section">
            <h3>TÀI KHOẢN</h3>
            <div className="user-info">
              <div className="avatar-initials">{user.initials}</div>
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            <Link to="/switch-account">Chuyển đổi Tài khoản</Link>
            <Link to="/manage-account">Quản lý tài khoản</Link>
          </div>

          {/* Phần Trello */}
          <div className="dropdown-section">
            <h3>ProManage</h3>
            <Link to="/profile">Hồ sơ và Hiện thị</Link>
            <Link to="/activity">Hoạt động</Link>
            <Link to="/cards">Thẻ</Link>
            <Link to="/settings">Cài đặt</Link>
            <Link to="/theme">Chủ đề</Link>
          </div>

          {/* Phần Tạo Không gian làm việc */}
          <div className="dropdown-section workspace-section">
            <Link to="/create-workspace">
              <FontAwesomeIcon icon={faUsers} className="workspace-icon" />
              Tạo Không gian làm việc
            </Link>
          </div>

          {/* Phần Trợ giúp và Đăng xuất */}
          <div className="dropdown-section">
            <Link to="/help">Trợ giúp</Link>
            <Link to="/shortcuts">Phím tắt</Link>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;