import axios from "axios";

const axiosUser = axios.create({
    baseURL: "https://solihov.uz/"
})
axiosUser.interceptors.request.use((config: any): any => {
    const access_token = localStorage.getItem("AccessToken")
    if (access_token) {
        config.headers["Authorization"] = `${access_token}`
    }
    return config
})

export default axiosUser