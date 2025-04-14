import apiClient from "./url-api";

const token = localStorage.getItem("token");

export const createNewBoard = async (data) => {
    try {
        const response = await apiClient.post(`/api/board/AddNewBoard`, data, {
            headers: {
                Accept: "text/plain",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating board:", error.response?.data || error.message);
        throw error;
    }
};

export const viewAllOpenBoards = async (userId, pageIndex, pageSize) => {
    try {
        const response = await apiClient.get(`/api/board/ViewAllBoardsPagin?userId=${userId}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error viewing boards:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};
export const viewBoardById = async (boardId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await apiClient.get(`/api/board/ViewBoardById/${boardId}`, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching board details:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};
export const archiveBoard = async (boardId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await apiClient.post(`/api/board/ArchiveBoard/${boardId}`, null, { // Thay post thành put
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Archive board response:", response.data);
        return response;
    } catch (error) {
        console.error("Error archiving board:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};

// Thêm API UnarchiveBoard
export const unarchiveBoard = async (boardId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await apiClient.post(`/api/board/UnarchiveBoard/${boardId}`, null, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Unarchive board response:", response.data);
        return response;
    } catch (error) {
        console.error("Error unarchiving board:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};
export const viewAllClosedBoards = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await apiClient.get(`/api/board/ViewAllClosedBoards`, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("View all closed boards response:", response.data);
        return response;
    } catch (error) {
        console.error("Error viewing closed boards:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};
export const updateBoard = async (boardId, data) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const formData = new FormData();
        formData.append("id", boardId);
        formData.append("userId", data.userId || localStorage.getItem("userId"));
        formData.append("title", data.title || "");
        formData.append("description", data.description || "");
        formData.append("status", data.status || "Open");
        formData.append("type", data.type || "Board");

        console.log("Data sent to update board:", {
            id: boardId,
            userId: formData.get("userId"),
            title: formData.get("title"),
            description: formData.get("description"),
            status: formData.get("status"),
            type: formData.get("type"),
        });

        const response = await apiClient.post(`/api/board/UpdateBoard`, formData, {
            headers: {
                Accept: "text/plain",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Update board response:", response.data);
        return response;
    } catch (error) {
        console.error("Error updating board:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};

// API mới: ChangeBoardName
export const changeBoardName = async (boardId, newName) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const formData = new FormData();
        formData.append("id", boardId);
        formData.append("title", newName);

        console.log("Data sent to change board name:", {
            id: boardId,
            title: newName,
        });

        const response = await apiClient.post(`/api/board/ChangeBoardName`, formData, {
            headers: {
                Accept: "text/plain",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Change board name response:", response.data);
        return response;
    } catch (error) {
        console.error("Error changing board name:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};

export const deleteBoard = async (boardId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await apiClient.delete(`/api/board/DeleteBoard/${boardId}`, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("Delete board response:", response.data);
        return response;
    } catch (error) {
        console.error("Error deleting board:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};
export const viewAllSubscriptions = async () => {
    try {
      const response = await apiClient.get('/api/subcription/ViewAllSubcriptions', {
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching subscriptions:', error.response?.data || error.message);
      throw error.response?.data || { error: 1, message: 'Lỗi không xác định' };
    }
  };