import axios from "axios";
import urlApi from "./url-api";

const apiClient = axios.create({
    baseURL: urlApi,
    timeout: 10000, // Thời gian timeout 10 giây
});

export const login = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/login`, data, {
            headers: {
                "Content-Type": `application/json`,
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

export const register = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/register`, data, {
            headers: {
                "Content-Type": `application/json`,
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

export const forgotPassword = async (email) => {
    try {
        const formData = new FormData();
        formData.append("EmailOrPhoneNumber", email);

        const response = await apiClient.post(
            `/api/Auth/user/password/forgot`,
            formData,
            {
                headers: {
                    "Content-Type": `multipart/form-data`,
                    Accept: "*/*",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const data = {
            token: token,
            newPassword: newPassword,
        };
        const response = await apiClient.post(
            `/api/Auth/user/password/reset`,
            data,
            {
                headers: {
                    "Content-Type": `application/json`,
                    Accept: "*/*",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export const verifyEmail = async (dataOTP) => {
    try {
        const response = await apiClient.post(
            `/api/Auth/user/otp/verify`,
            dataOTP,
            {
                headers: {
                    "Content-Type": `application/json`,
                    Accept: "*/*",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};