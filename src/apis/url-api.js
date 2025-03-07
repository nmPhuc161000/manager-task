import axios from "axios";
const apiClient = axios.create({
    baseURL:
        "https://localhost:7284",
    timeout: 100000, // Thời gian timeout 10 giây
});
export default apiClient;