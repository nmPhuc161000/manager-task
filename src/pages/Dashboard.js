import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimes, faQuestionCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";
import { createNewBoard, viewAllBoards } from "../apis/authentication-api";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [type, setType] = useState("Board");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const message = localStorage.getItem("loginMessage");
    console.log("Login message in Dashboard:", message);
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.removeItem("loginMessage");
    }
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await viewAllBoards(0, 10); // Default pagination
      console.log("View all boards response:", response.data);
      if (response.data && response.data.error === 0) {
        setBoards(response.data.items || []); // Use 'items' instead of 'data'
      } else {
        setBoards([]); // Ensure boards is empty if error or no data
        toast.error(response.data.message || "Không thể tải danh sách bảng!");
      }
    } catch (error) {
      setBoards([]); // Ensure boards is empty on error
      toast.error(error.message || "Đã xảy ra lỗi khi tải danh sách bảng!");
    }
  };

  const openPanel = () => {
    setPanelIsOpen(true);
  };

  const closePanel = () => {
    setPanelIsOpen(false);
    setTitle("");
    setDescription("");
    setStatus("Open");
    setType("Board");
  };

  const handleCreateBoard = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      toast.error("Vui lòng đăng nhập để tạo bảng!");
      closePanel();
      return;
    }
    if (!title.trim()) {
      toast.error("Tiêu đề bảng là bắt buộc!");
      return;
    }

    const data = {
      id: uuidv4(),
      userId: userId,
      title: title,
      description: description || "",
      status: status,
      type: type,
    };

    try {
      const response = await createNewBoard(data);
      console.log("Create board response:", response.data);

      if (response.data.error === 0) {
        toast.success(response.data.message || "Tạo bảng thành công!");
        closePanel();
        fetchBoards();
      } else {
        toast.error(response.data.message || "Tạo bảng thất bại!");
      }
    } catch (error) {
      console.log("Detailed error:", error.response?.data || error.message);
      const responseData = error.response?.data || {};
      toast.error(responseData.message || "Đã xảy ra lỗi khi tạo bảng!");
    }
  };

  const handleViewClosedBoards = () => {
    console.log("Xem tất cả các bảng đã đóng");
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <FontAwesomeIcon icon={faClock} className="dashboard-icon" />
        <h2 className="dashboard-title">Đã Xem Gần Đây</h2>
      </div>
      <h2 className="dashboard-title">Các Không gian làm việc của bạn</h2>
      <div className="dashboard-tabs">
        <button className="tab active">Trello Không gian làm việc</button>
        <button className="tab">Bảng</button>
        <button className="tab">Đang xem</button>
        <button className="tab">Thành viên (6)</button>
        <button className="tab">Cài đặt</button>
        <button className="tab upgrade">Nâng cấp</button>
      </div>
      <div className="dashboard-section">
        {boards.map((board, index) => (
          <div key={index} className="dashboard-card">
            <h3>{board.title || board.Title}</h3> {/* Handle both cases */}
            <FontAwesomeIcon icon={faStar} className="card-icon" />
          </div>
        ))}
        <div className="create-board-wrapper">
          <button className="create-board-btn" onClick={openPanel}>
            Tạo bảng mới
          </button>
          {panelIsOpen && (
            <div className="create-panel">
              <div className="panel-header">
                <h2>Tạo bảng</h2>
                <button className="panel-close-btn" onClick={closePanel}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="board-title">
                    Tiêu đề bảng <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="board-title"
                    placeholder="Tiêu đề bảng là bắt buộc"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={title.trim() ? "" : "error"}
                  />
                  {!title.trim() && <p className="error-message">Tiêu đề bảng là bắt buộc</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="board-description">Mô tả</label>
                  <input
                    type="text"
                    id="board-description"
                    placeholder="Nhập mô tả (tùy chọn)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Trạng thái</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="type">Loại</label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Board">Board</option>
                    <option value="Calendar">Calendar</option>
                  </select>
                </div>
              </div>
              <div className="panel-footer">
                <button className="create-btn" onClick={handleCreateBoard}>
                  Tạo bảng mới
                  <FontAwesomeIcon icon={faQuestionCircle} className="question-icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button className="closed-boards-link" onClick={handleViewClosedBoards}>
        Xem tất cả các bảng đã đóng
      </button>
    </DashboardLayout>
  );
};

export default Dashboard;