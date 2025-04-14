import apiClient from "./url-api";

const token = localStorage.getItem("token");

export const getAllColumns = async (boardId = null) => {
    try {
        const config = {
            headers: {
                Accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        // Optionally include boardId as a query parameter if needed
        const url = boardId
            ? `/api/Colums/ViewAllColumns?boardId=${boardId}`
            : `/api/Colums/ViewAllColumns`;

        const response = await apiClient.get(url, config);
        return response.data; // Assuming the API returns the data directly
    } catch (error) {
        console.error("Error fetching columns:", error.response?.data || error.message);
        throw error;
    }
};

export const getColumnById = async (columnId) => {
    try {
        const response = await apiClient.get(`/api/Colums/ViewColumsById/${columnId}`, {
            headers: {
                Accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the API returns the column data directly
    } catch (error) {
        console.error("Error fetching column:", error.response?.data || error.message);
        throw error;
    }
};

export const getColumnsByBoardId = async (boardId) => {
    try {
        const response = await apiClient.get(`/api/Colums/ViewColumsByBoardId/${boardId}`, {
            headers: {
                Accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the API returns an array of columns directly
    } catch (error) {
        console.error("Error fetching columns by board ID:", error.response?.data || error.message);
        throw error;
    }
};

export const createNewColumn = async (data) => {
    try {
        const response = await apiClient.post(`/api/Colums/AddNewColumn`, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Phản hồi từ API createNewColumn:", response); // Kiểm tra toàn bộ phản hồi
        return response.data; // Đảm bảo trả về dữ liệu cột mới
    } catch (error) {
        console.error("Lỗi khi tạo cột:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteColumn = async (columnId) => {
    try {
        const response = await apiClient.delete(`/api/Colums/DeleteColumn/${columnId}`, {
            headers: {
                Accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Phản hồi từ API deleteColumn:", response); // Kiểm tra toàn bộ phản hồi
        return response.data; // Trả về dữ liệu phản hồi
    } catch (error) {
        console.error("Lỗi khi xóa cột:", error.response?.data || error.message);
        throw error;
    }
};

export const moveColumn = async (columnId, boardId, newPosition) => {
    try {
        const data = new FormData();
        data.append("ColumnId", columnId);
        data.append("BoardId", boardId);
        data.append("ColumnPosition", newPosition);

        const response = await apiClient.put("/api/Colums/MoveColum", data, {
            headers: {
                Accept: "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Phản hồi từ API moveColumn:", response);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi di chuyển cột:", error.response?.data || error.message);
        throw error;
    }
};

export const copyColumn = async (columnId, title) => {
    try {
        const data = new FormData();
        data.append("ColumnId", columnId);
        data.append("Title", title);

        const response = await apiClient.post(`/api/Colums/CopyColumn`, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the API returns the new column
    } catch (error) {
        console.error("Error copying column:", error.response?.data || error.message);
        throw error;
    }
};