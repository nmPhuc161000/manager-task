import apiClient from "./url-api";

const token = localStorage.getItem("token");

const checkToken = () => {
    if (!token) {
        throw new Error("Không tìm thấy token. Vui lòng đăng nhập lại!");
    }
};

export const viewAllCards = async () => {
    try {
        checkToken(); // Kiểm tra token
        const response = await apiClient.get("/api/card/ViewAllCards", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all cards:", error);
        throw error;
    }
};

export const viewAllOpenCards = async () => {
    try {
        const response = await apiClient.get("/api/card/ViewAllOpenCards", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching open cards:", error);
        throw error;
    }
};

export const viewAllArchivedCards = async () => {
    try {
        const response = await apiClient.get("/api/card/ViewAllArchivedCards", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching archived cards:", error);
        throw error;
    }
};

export const openCard = async (cardId) => {
    try {
        const response = await apiClient.put(`/api/card/OpenCard/${cardId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error opening card:", error);
        throw error;
    }
};

export const archiveCard = async (cardId) => {
    try {
        const response = await apiClient.put(`/api/card/ArchiveCard/${cardId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error archiving card:", error);
        throw error;
    }
};

export const viewCardById = async (cardId) => {
    try {
        const response = await apiClient.get(`/api/card/ViewCardById/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching card by ID:", error);
        throw error;
    }
};

export const addNewCard = async ({ userId, columnId, title, id }) => {
    try {
        const formData = new FormData();
        if (id) formData.append("Id", id); // Id is optional
        formData.append("UserId", userId);
        formData.append("ColumnId", columnId);
        formData.append("Title", title);

        const response = await apiClient.post("/api/card/AddANewCard", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding new card:", error);
        throw error;
    }
};

export const updateCard = async ({ id, title, description, status, assignedCompletion }) => {
    try {
        const formData = new FormData();
        formData.append("Id", id); // Id is required
        if (title) formData.append("Title", title);
        if (description) formData.append("Description", description);
        if (status) formData.append("Status", status);
        if (assignedCompletion) formData.append("AssignedCompletion", assignedCompletion);

        const response = await apiClient.put("/api/card/UpdateCard", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating card:", error);
        throw error;
    }
};

export const changeCardName = async ({ id, title }) => {
    try {
        const formData = new FormData();
        formData.append("Id", id); // Id is required
        formData.append("Title", title); // Title is required

        const response = await apiClient.put("/api/card/ChangeCardName", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error changing card name:", error);
        throw error;
    }
};

export const editCardDescription = async ({ id, description }) => {
    try {
        const formData = new FormData();
        formData.append("Id", id); // Id is required
        formData.append("Description", description); // Description is required

        const response = await apiClient.put("/api/card/EditCardDescription", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error editing card description:", error);
        throw error;
    }
};

export const addDueDateToCard = async ({ cardId, startDate, dueDate, reminder }) => {
    try {
        const formData = new FormData();
        formData.append("CardId", cardId); // CardId is required
        formData.append("StartDate", startDate); // StartDate is required
        formData.append("DueDate", dueDate); // DueDate is required
        formData.append("Reminder", reminder); // Reminder is required

        const response = await apiClient.post("/api/card/AddDueDateToCard", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding due date to card:", error);
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try {
        const response = await apiClient.delete(`/api/card/DeleteCard/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting card:", error);
        throw error;
    }
};

export const uploadFileAttachment = async (cardId, file) => {
    try {
        const formData = new FormData();
        formData.append("File", file); // File is required

        const response = await apiClient.post(`/api/card/UploadFileAttachment/${cardId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file attachment:", error);
        throw error;
    }
};

export const moveCardInColumn = async (id, columnId, newPosition) => {
    try {
        const response = await apiClient.put(
            `/api/card/MoveCardInColumn`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    Id: id,
                    ColumnId: columnId,
                    NewPosition: newPosition,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error moving card in column:", error);
        throw error;
    }
};

export const deleteAttachment = async (cardId, attachmentId) => {
    try {
        const response = await apiClient.delete(`/api/card/DeleteAttachment/${cardId}/${attachmentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting attachment:", error);
        throw error;
    }
};

export const moveCardToColumn = async (id, newColumnId, newPosition) => {
    try {
        const response = await apiClient.put(
            `/api/card/MoveCardToColumn`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    Id: id,
                    NewColumnId: newColumnId,
                    NewPosition: newPosition,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error moving card to column:", error);
        throw error;
    }
};

export const downloadAttachment = async (cardId, attachmentId) => {
    try {
        const response = await apiClient.get(`/api/card/DownloadAttachment`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                cardId: cardId,
                attachmentId: attachmentId,
            },
            responseType: 'blob', // For handling file downloads
        });
        return response.data;
    } catch (error) {
        console.error("Error downloading attachment:", error);
        throw error;
    }
};