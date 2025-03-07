import apiClient from "./url-api";

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
        const response = await apiClient.post(`/api/Auth/user/register/user`, data, {
            headers: {
                "Content-Type": `multipart/form-data`,
                Accept: "*/*",
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
}

export const verifyOtp = async (data) => {
    try {
        const response = await apiClient.post(`/api/Auth/user/otp/verify`, data,
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

export const forgotPassword = async (email) => {
    try {
        console.log(email);

        const response = await apiClient.post(
            `/api/Auth/user/password/forgot`,
            email,
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

export const resetPassword = async (data) => {
    try {
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

