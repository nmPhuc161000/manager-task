import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { viewAllClosedBoards, unarchiveBoard } from "../apis/board-api";
import { toast } from "react-toastify";
import "../styles/ArchivedBoardList.css";

const ArchivedBoardList = ({ onClose, onUnarchive }) => {
  const [archivedBoards, setArchivedBoards] = useState([]);

  useEffect(() => {
    fetchArchivedBoards();
  }, []);

  const fetchArchivedBoards = async () => {
    try {
      const response = await viewAllClosedBoards();
      console.log("View all closed boards response:", response.data);
      if (response.data && response.data.error === 0) {
        setArchivedBoards(response.data.items || response.data.data || []);
      } else {
        setArchivedBoards([]);
        toast.error(response.data.message || "Không thể tải danh sách bảng đã lưu trữ!");
      }
    } catch (error) {
      setArchivedBoards([]);
      toast.error(error.message || "Đã xảy ra lỗi khi tải danh sách bảng đã lưu trữ!");
    }
  };

  const handleUnarchiveBoard = async (boardId) => {
    try {
      const response = await unarchiveBoard(boardId);
      if (response.data && response.data.error === 0) {
        toast.success(response.data.message || "Khôi phục bảng thành công!");
        fetchArchivedBoards(); // Cập nhật danh sách bảng đã lưu trữ
        onUnarchive(); // Gọi callback để cập nhật danh sách bảng mở
      } else {
        toast.error(response.data.message || "Khôi phục bảng thất bại!");
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi khi khôi phục bảng!");
    }
  };

  return (
    <div className="archived-board-list">
      <h3>Bảng đã lưu trữ</h3>
      <button onClick={onClose} style={{ marginBottom: "10px" }}>
        Ẩn
      </button>
      {archivedBoards.length === 0 ? (
        <p>Không có bảng nào đã lưu trữ.</p>
      ) : (
        archivedBoards.map((board, index) => (
          <div key={index} className="dashboard-card" style={{ position: "relative" }}>
            <div style={{ cursor: "pointer" }}>
              <h3>{board.title || board.Title}</h3>
              <FontAwesomeIcon icon={faStar} className="card-icon" />
            </div>
            <button
              onClick={() => handleUnarchiveBoard(board.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
              }}
              title="Khôi phục bảng"
            >
              <FontAwesomeIcon icon={faBoxOpen} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ArchivedBoardList;