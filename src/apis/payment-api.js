import apiClient from "./url-api";

const token = localStorage.getItem("token");

export const createNewPayment = async (data) => {
    try {
        const response = await apiClient.post(`/api/Payment/create`, data, {
            headers: {
                Accept: "text/plain",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating payment:", error.response?.data || error.message);
        throw error;
    }
}