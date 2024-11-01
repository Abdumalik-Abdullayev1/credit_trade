import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://auth.solihov.uz"
})
const axiosUser = axios.create({
    baseURL: "https://solihov.uz",
 });
axiosUser.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("AccessToken")
    if (access_token) {
        config.headers["Authorization"] = `${access_token}`
    }
    return config
})

export { axiosInstance, axiosUser }