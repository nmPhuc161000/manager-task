import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { viewBoardById } from "../apis/board-api";
import "../styles/BoardDetails.css";

const BoardDetails = () => {
  const { boardId } = useParams(); // Get boardId from URL
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]); // Placeholder for lists (columns) in the board
  const [newListTitle, setNewListTitle] = useState(""); // For adding a new list

  // Fetch board details when the component mounts
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await viewBoardById(boardId);
        console.log("Board details response:", response.data);
        if (response.data && response.data.error === 0) {
          setBoard(response.data.data);
        } else {
          toast.error(response.data.message || "Không thể tải thông tin bảng!");
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.message || "Đã xảy ra lỗi khi tải bảng!");
        navigate("/dashboard");
      }
    };

    // Placeholder for fetching lists (you'll need a separate API for this)
    const fetchLists = async () => {
      // For now, we'll use mock data since the API for lists isn't provided
      setLists([
        { id: "list1", title: "To Do", tasks: [{ id: "task1", title: "Task 1" }] },
        { id: "list2", title: "In Progress", tasks: [{ id: "task2", title: "Task 2" }] },
      ]);
    };

    fetchBoardDetails();
    fetchLists();
  }, [boardId, navigate]);

  // Add a new list
  const handleAddList = () => {
    if (!newListTitle.trim()) {
      toast.error("Tiêu đề danh sách là bắt buộc!");
      return;
    }
    const newList = {
      id: `list-${lists.length + 1}`,
      title: newListTitle,
      tasks: [],
    };
    setLists([...lists, newList]);
    setNewListTitle("");
    toast.success("Đã thêm danh sách mới!");
  };

  // Delete a list
  const handleDeleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    toast.success("Đã xóa danh sách!");
  };

  // Loading state
  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="board-details-header">
        <button onClick={() => navigate("/dashboard")} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại Dashboard
        </button>
        <h2>{board.title}</h2>
        <p className="description">{board.description || "Không có mô tả."}</p>
      </div>
      <div className="board-details-content">
        <div className="lists-container">
          {lists.map((list) => (
            <div key={list.id} className="list-card">
              <div className="list-header">
                <h4>{list.title}</h4>
                <button onClick={() => handleDeleteList(list.id)} className="delete-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="tasks">
                {list.tasks.map((task) => (
                  <div key={task.id} className="task-card">
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="add-list">
            <input
              type="text"
              placeholder="Nhập tiêu đề danh sách..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={handleAddList} className="add-list-btn">
              <FontAwesomeIcon icon={faPlus} /> Thêm danh sách
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BoardDetails;