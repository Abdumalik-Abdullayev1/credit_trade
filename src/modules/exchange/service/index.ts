import { axiosUser } from "@api";
import { ExchangeType, GetExchangeType } from "../types";

// ========== GET ==========
export const getExchange = async(data: GetExchangeType) => {
    const {id, params} = data
    const response = await axiosUser.get(`exchange/list_product_by/${id}`, {params})
    return response?.data
}

// ========== CREATE ==========
export const createExchange = async(data: ExchangeType[]) => {
    const response = await axiosUser.post('/exchange/create', data)
    return response?.data
}

// ========== UPDATE ==========
export const updateExchange = async(data: ExchangeType) => {
    const { id } = data
    delete (data as any).id
    const response = await axiosUser.put(`/exchange/update/${id}`, data)
    return response?.data
}

// ========== DELETE ==========
export const deleteExchange = async(id: string | undefined) => {
    const response = await axiosUser.delete(`/exchange/delete/${id}`)
    return response?.data

    
}