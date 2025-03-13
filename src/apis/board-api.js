import apiClient from "./url-api";
import { v4 as uuidv4 } from "uuid";

const token = localStorage.getItem("token");

export const createNewBoard = async (data) => {
    try {
        // const formData = new FormData();
        // formData.append("id", data.id || uuidv4());
        // formData.append("userId", data.userId);
        // formData.append("title", data.title);
        // formData.append("description", data.description || "");
        // formData.append("status", data.status);
        // formData.append("type", data.type);

        // console.log("Data sent to create board:", {
        //     id: formData.get("id"),
        //     userId: formData.get("userId"),
        //     title: formData.get("title"),
        //     description: formData.get("description"),
        //     status: formData.get("status"),
        //     type: formData.get("type"),
        // });

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

export const viewAllOpenBoards = async (pageIndex = 0, pageSize = 10) => {
    try {
        const response = await apiClient.get(`/api/board/ViewAllOpenBoards`, {
            params: {
                pageIndex,
                pageSize,
            },
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