import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getColumnsByBoardId, createNewColumn, deleteColumn, moveColumn, copyColumn } from "../apis/column-api";

const useColumns = (boardId) => {
    const [columns, setColumns] = useState([]);
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const [loadingColumns, setLoadingColumns] = useState(true);
    const [addingColumn, setAddingColumn] = useState(false);

    const fetchColumns = useCallback(async () => {
        setLoadingColumns(true);
        try {
            const columnsData = await getColumnsByBoardId(boardId);
            console.log("Dữ liệu cột từ API:", columnsData);

            if (Array.isArray(columnsData)) {
                const invalidColumns = columnsData.filter(
                    (column) => !column.id || typeof column.id !== "string"
                );
                if (invalidColumns.length > 0) {
                    console.warn("Có cột không có id hợp lệ:", invalidColumns);
                }

                const ids = columnsData.map((column) => column.id);
                const uniqueIds = new Set(ids);
                if (ids.length !== uniqueIds.size) {
                    console.warn("Có id trùng lặp trong danh sách cột:", ids);
                }

                const mappedColumns = columnsData.map((column, index) => ({
                    id: String(column.id || `temp-id-${index}`),
                    title: column.title || "Untitled",
                    tasks: column.tasks || [],
                }));
                setColumns(mappedColumns);
            } else {
                toast.error("Dữ liệu cột không hợp lệ!");
            }
        } catch (error) {
            toast.error("Không thể tải danh sách cột!");
        } finally {
            setLoadingColumns(false);
        }
    }, [boardId]);

    useEffect(() => {
        if (boardId) {
            fetchColumns();
        }
    }, [boardId, fetchColumns]);

    const handleAddColumn = async () => {
        if (!newColumnTitle.trim()) {
            toast.error("Tiêu đề cột là bắt buộc!");
            return;
        }

        setAddingColumn(true);
        try {
            const data = new FormData();
            data.append("BoardId", boardId);
            data.append("Title", newColumnTitle);
            data.append("Status", "Open");

            const response = await createNewColumn(data);
            console.log("Phản hồi từ createNewColumn:", response);

            if (response && response.error === 0) {
                setNewColumnTitle("");
                toast.success("Đã thêm cột mới!");
                await fetchColumns();
            } else {
                toast.error(response.message || "Dữ liệu cột mới không hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm cột:", error);
            toast.error("Không thể thêm cột mới: " + (error.message || "Lỗi không xác định"));
        } finally {
            setAddingColumn(false);
        }
    };

    const handleDeleteColumn = async (columnId) => {
        try {
            const response = await deleteColumn(columnId);
            console.log("Phản hồi từ deleteColumn:", response);

            if (response && response.error === 0) {
                toast.success("Đã xóa cột!");
                await fetchColumns();
            } else {
                toast.error(response.message || "Không thể xóa cột!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa cột:", error);
            const errorMessage = error.message.includes("trigger")
                ? "Không thể xóa cột do lỗi trigger trong cơ sở dữ liệu. Vui lòng liên hệ quản trị viên!"
                : "Không thể xóa cột: " + (error.message || "Lỗi không xác định");
            toast.error(errorMessage);
        }
    };

    const handleMoveColumn = async (columnId, newPosition) => {
        try {
            const response = await moveColumn(columnId, boardId, newPosition);
            console.log("Phản hồi từ moveColumn:", response);

            if (response && response.error === 0) {
                toast.success("Đã di chuyển cột!");
                await fetchColumns();
            } else {
                toast.error(response.message || "Không thể di chuyển cột!");
            }
        } catch (error) {
            console.error("Lỗi khi di chuyển cột:", error);
            const errorMessage = error.message.includes("404")
                ? "Không thể di chuyển cột: API MoveColumn không tồn tại. Vui lòng liên hệ quản trị viên!"
                : "Không thể di chuyển cột: " + (error.message || "Lỗi không xác định");
            toast.error(errorMessage);
        }
    };

    const handleCopyColumn = async (columnId) => {
        try {
            const response = await copyColumn(columnId);
            console.log("Phản hồi từ copyColumn:", response);

            if (response && response.error === 0) {
                toast.success("Đã sao chép cột!");
                await fetchColumns();
            } else {
                toast.error(response.message || "Không thể sao chép cột!");
            }
        } catch (error) {
            console.error("Lỗi khi sao chép cột:", error);
            const errorMessage = error.message.includes("404")
                ? "Không thể sao chép cột: API CopyColumn không tồn tại. Vui lòng liên hệ quản trị viên!"
                : error.message.includes("trigger")
                ? "Không thể sao chép cột do lỗi trigger trong cơ sở dữ liệu. Vui lòng liên hệ quản trị viên!"
                : "Không thể sao chép cột: " + (error.message || "Lỗi không xác định");
            toast.error(errorMessage);
        }
    };

    return {
        columns,
        newColumnTitle,
        setNewColumnTitle,
        loadingColumns,
        addingColumn,
        handleAddColumn,
        handleDeleteColumn,
        handleMoveColumn,
        handleCopyColumn,
    };
};

export default useColumns;