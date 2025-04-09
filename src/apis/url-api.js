import axios from "axios";
const apiClient = axios.create({
    baseURL:
        "http://promanager.me:8080",
    timeout: 100000, // Thời gian timeout 10 giây
});
export default apiClient;