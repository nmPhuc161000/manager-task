import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { viewBoardById } from "../apis/board-api";
import useColumns from "../hooks/useColumns";
import BoardColumns from "../components/BoardColumns";
import "../styles/BoardDetails.css";

const BoardDetails = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [localColumns, setLocalColumns] = useState([]);

    const {
        columns,
        newColumnTitle,
        setNewColumnTitle,
        loadingColumns,
        addingColumn,
        handleAddColumn,
        handleDeleteColumn,
        handleMoveColumn,
        handleCopyColumn,
    } = useColumns(boardId);

    // Đồng bộ localColumns với columns từ useColumns
    useEffect(() => {
        setLocalColumns(columns);
    }, [columns]);

    useEffect(() => {
        const fetchBoardDetails = async () => {
            try {
                const response = await viewBoardById(boardId);
                console.log("Phản hồi chi tiết bảng:", response.data);
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

        fetchBoardDetails();
    }, [boardId, navigate]);

    if (!board) {
        return <div>Đang tải...</div>;
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
            <BoardColumns
                localColumns={localColumns}
                setLocalColumns={setLocalColumns}
                columns={columns}
                loadingColumns={loadingColumns}
                addingColumn={addingColumn}
                newColumnTitle={newColumnTitle}
                setNewColumnTitle={setNewColumnTitle}
                handleAddColumn={handleAddColumn}
                handleMoveColumn={handleMoveColumn}
                handleCopyColumn={handleCopyColumn}
                handleDeleteColumn={handleDeleteColumn}
            />
        </DashboardLayout>
    );
};

export default BoardDetails;