import { ContractType } from '../types';
import { axiosUser } from '@api';
import { ParamsType } from "@types";


// ========== GET ==========
export const getContract = async(params: ParamsType) => {
    const response = await axiosUser.get("/contract/list", { params })
    return response?.data
}

// ========== CREATE ==========
export const createContract = async(data: ContractType) => {
    const response = await axiosUser.post("/contract/create", data)
    return response?.data
}

// ========== UPDATE ==========
export const updateContract = async(data: ContractType) => {
    const { id } = data
    delete (data as any).id
    const response = await axiosUser.put(`/contract/update/${id}`, data)
    return response?.data
}

// ========== DELETE ==========
export const deleteContract = async(id: string | undefined) => {
    const response = await axiosUser.delete(`/contract/delete/${id}`)
    return response?.data
}

// ========== UPLOAD IMAGE ==========
export const uploadContractImg = async(data: any)=> {
    return await axiosUser.post("/minio/media", data)
}