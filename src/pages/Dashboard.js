// src/pages/Dashboard.js
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTimes, faQuestionCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";
import { createNewBoard, viewAllOpenBoards, archiveBoard, updateBoard, changeBoardName } from "../apis/board-api";
import { v4 as uuidv4 } from "uuid";
import BoardList from "../components/BoardList";
import ArchivedBoardList from "../components/ArchivedBoardList";
import { ThemeContext } from "../contexts/ThemeContext";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [updatePanelIsOpen, setUpdatePanelIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [type, setType] = useState("Board");
  const [boards, setBoards] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const message = localStorage.getItem("loginMessage");
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
      const response = await viewAllOpenBoards(userId, 0, 10);
      if (response.data) {
        setBoards(response.data.items || response.data.data || []);
      } else {
        setBoards([]);
        toast.error(response.data.message || "Không thể tải danh sách bảng!");
      }
    } catch (error) {
      setBoards([]);
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

  const openUpdatePanel = (boardId) => {
    setSelectedBoardId(boardId);
    const board = boards.find((b) => b.id === boardId);
    setTitle(board?.title || "");
    setDescription(board?.description || "");
    setStatus(board?.status || "Open");
    setType(board?.type || "Board");
    setUpdatePanelIsOpen(true);
  };

  const closeUpdatePanel = () => {
    setUpdatePanelIsOpen(false);
    setSelectedBoardId(null);
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
      if (response.data.error === 0) {
        toast.success(response.data.message || "Tạo bảng thành công!");
        closePanel();
        fetchBoards();
      } else {
        toast.error(response.data.message || "Tạo bảng thất bại!");
      }
    } catch (error) {
      const responseData = error.response?.data || {};
      toast.error(responseData.message || "Đã xảy ra lỗi khi tạo bảng!");
    }
  };

  const handleViewClosedBoards = () => {
    setShowArchived(true);
  };

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  const handleArchiveBoard = async (boardId) => {
    try {
      const response = await archiveBoard(boardId);
      if (response.data && response.data.error === 0) {
        toast.success(response.data.message || "Lưu trữ bảng thành công!");
        fetchBoards();
      } else {
        toast.error(response.data.message || "Lưu trữ bảng thất bại!");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi lưu trữ bảng!");
    }
  };

  const handleUpdateBoard = async () => {
    if (!selectedBoardId) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Vui lòng đăng nhập để cập nhật bảng!");
      closeUpdatePanel();
      return;
    }
    if (!title.trim()) {
      toast.error("Tiêu đề bảng là bắt buộc!");
      return;
    }

    const data = {
      userId: userId,
      title: title,
      description: description,
      status: status,
      type: type,
    };

    try {
      const response = await updateBoard(selectedBoardId, data);
      if (response.data && response.data.error === 0) {
        toast.success(response.data.message || "Cập nhật bảng thành công!");
        closeUpdatePanel();
        fetchBoards();
      } else {
        toast.error(response.data.message || "Cập nhật bảng thất bại!");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật bảng!");
    }
  };

  const handleChangeBoardName = async () => {
    if (!selectedBoardId) return;

    if (!title.trim()) {
      toast.error("Tiêu đề bảng là bắt buộc!");
      return;
    }

    try {
      const response = await changeBoardName(selectedBoardId, title);
      if (response.data && response.data.error === 0) {
        toast.success(response.data.message || "Đổi tên bảng thành công!");
        closeUpdatePanel();
        fetchBoards();
      } else {
        toast.error(response.data.message || "Đổi tên bảng thất bại!");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi đổi tên bảng!");
    }
  };

  const handleCloseArchivedList = () => {
    setShowArchived(false);
  };

  const handleUnarchive = () => {
    fetchBoards();
  };

  return (
    <DashboardLayout>
      <div className={`dashboard ${theme}`}>
        <div className="dashboard-header">
          <FontAwesomeIcon icon={faClock} className="dashboard-icon" />
          <h2 className="dashboard-title">Đã Xem Gần Đây</h2>
        </div>
        <h2 className="dashboard-title">Các Không gian làm việc của bạn</h2>
        <div className="dashboard-tabs">
          <button className="tab active">Không gian làm việc</button>
          <button className="tab">Bảng</button>
          <button className="tab">Đang xem</button>
          <button className="tab">Thành viên (6)</button>
          <Link to="/settings">
            <button className="tab">Cài đặt</button>
          </Link>
          <Link to="/payment">
            <button className="tab upgrade">Nâng cấp</button>
          </Link>
        </div>
        <div className="dashboard-section">
          <BoardList
            boards={boards}
            handleBoardClick={handleBoardClick}
            handleArchiveBoard={handleArchiveBoard}
            handleUpdateBoard={openUpdatePanel}
          />
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
                      Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="board-title"
                      placeholder="Tiêu đề bảng là bắt buộc"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={title.trim() ? "" : "error"}
                    />
                    {!title.trim() && (
                      <p className="error-message">Tiêu đề bảng là bắt buộc</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="board-description">Description</label>
                    <input
                      type="text"
                      id="board-description"
                      placeholder="Nhập mô tả (tùy chọn)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type</label>
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
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="question-icon"
                    />
                  </button>
                </div>
              </div>
            )}
            {updatePanelIsOpen && (
              <div className="create-panel">
                <div className="panel-header">
                  <h2>Cập nhật bảng</h2>
                  <button className="panel-close-btn" onClick={closeUpdatePanel}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label htmlFor="board-title">
                      Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="board-title"
                      placeholder="Tiêu đề bảng là bắt buộc"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={title.trim() ? "" : "error"}
                    />
                    {!title.trim() && (
                      <p className="error-message">Tiêu đề bảng là bắt buộc</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="board-description">Description</label>
                    <input
                      type="text"
                      id="board-description"
                      placeholder="Nhập mô tả (tùy chọn)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
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
                    <label htmlFor="type">Type</label>
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
                  <button className="create-btn" onClick={handleUpdateBoard}>
                    Cập nhật bảng
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="question-icon"
                    />
                  </button>
                  <button
                    className="create-btn"
                    style={{ marginTop: "10px" }}
                    onClick={handleChangeBoardName}
                  >
                    Đổi tên bảng
                    <FontAwesomeIcon icon={faEdit} className="question-icon" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <button className="closed-boards-link" onClick={handleViewClosedBoards}>
          Xem tất cả các bảng đã đóng
        </button>
        {showArchived && (
          <ArchivedBoardList
            onClose={handleCloseArchivedList}
            onUnarchive={handleUnarchive}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;