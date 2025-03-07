import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import '../styles/Dashboard.css';
const Dashboard = () => {
  const handleViewClosedBoards = () => {
    // Thêm logic xử lý (ví dụ: mở modal, chuyển hướng, v.v.)
    console.log("Xem tất cả các bảng đã đóng");
  };

  return (
    <DashboardLayout>
      <h2 className="workspace-title">Các Không gian làm việc của bạn</h2>
      <div className="workspace-tabs">
        <button className="tab active">Trello Không gian làm việc</button>
        <button className="tab">Bảng</button>
        <button className="tab">Đang xem</button>
        <button className="tab">Thành viên (6)</button>
        <button className="tab">Cài đặt</button>
        <button className="tab upgrade">Nâng cấp</button>
      </div>
      <div className="workspace-section">
        <div className="workspace-card">
          <h3>OJT - Final Project</h3>
          <FontAwesomeIcon icon={faUsers} className="card-icon" />
        </div>
        <button className="create-board-btn">Tạo bảng mới</button>
      </div>
      <button className="closed-boards-link" onClick={handleViewClosedBoards}>
        Xem tất cả các bảng đã đóng
      </button>
    </DashboardLayout>
  );
};

export default Dashboard;