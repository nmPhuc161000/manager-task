import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArchive, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../styles/BoardList.css";

const BoardList = ({ boards, handleBoardClick, handleArchiveBoard, handleUpdateBoard }) => {
  return (
    <div className="board-list">
      {boards.map((board, index) => (
        <div key={index} className="dashboard-card" style={{ position: "relative" }}>
          <div
            onClick={() => handleBoardClick(board.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{board.title || board.Title}</h3>
            <FontAwesomeIcon icon={faStar} className="card-icon" />
          </div>
          <button
            onClick={() => handleArchiveBoard(board.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "30px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
            }}
            title="Lưu trữ bảng"
          >
            <FontAwesomeIcon icon={faArchive} />
          </button>
          <button
            onClick={() => handleUpdateBoard(board.id)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
            }}
            title="Cập nhật bảng"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BoardList;