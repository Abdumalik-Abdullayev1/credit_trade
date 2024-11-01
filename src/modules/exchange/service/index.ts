import { SecondParamsType } from "@types";
import { axiosUser } from "@api";

// ========== GET ==========
export const getExchange = async(params: SecondParamsType) => {
    const response = await axiosUser.get("/exchange/list", { params })
    return response?.data
}

// ========== CREATE ==========
// ========== UPDATE ==========
// ========== DELETE ==========