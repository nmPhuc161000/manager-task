import apiClient from "./url-api";
import { v4 as uuidv4 } from "uuid";

export const login = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/login`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/register/user`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

export const verifyOtp = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/otp/verify`, data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        console.log(email);
        const response = await apiClient.post(
            `/api/Auth/user/password/forgot`,
            { email }, // Wrap in object
            {
                headers: {
                    "Content-Type": "application/json", // Changed from multipart/form-data
                    Accept: "*/*",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        throw error;
    }
};

export const resetPassword = async (data) => {
    try {
        const response = await apiClient.post(
            `/api/Auth/user/password/reset`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

export const createNewBoard = async (data) => {
    try {
        const formData = new FormData();
        formData.append("id", data.id || uuidv4());
        formData.append("userId", data.userId);
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("status", data.status);
        formData.append("type", data.type);

        console.log("Data sent to create board:", {
            id: formData.get("id"),
            userId: formData.get("userId"),
            title: formData.get("title"),
            description: formData.get("description"),
            status: formData.get("status"),
            type: formData.get("type"),
        });

        const response = await apiClient.post(`/api/board/AddNewBoard`, formData, {
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating board:", error.response?.data || error.message);
        throw error;
    }
};

export const viewAllBoards = async (pageIndex = 0, pageSize = 10) => {
    try {
        const response = await apiClient.get(`/api/board/ViewAllBoards`, {
            params: {
                pageIndex,
                pageSize,
            },
            headers: {
                Accept: "*/*",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error viewing boards:", error.response?.data || error.message);
        throw error.response?.data || { error: 1, message: "Lỗi không xác định" };
    }
};