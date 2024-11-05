import { ParamsType } from "@types";
import { ProductsType } from "../types";
import { axiosUser } from "@api";

// ========== GET ==========
export const getProduct = async (params: ParamsType) => {
    const response = await axiosUser.get("/product/list", {params})
    return response?.data
}

// ========== CREATE ==========
export const createProduct = async (data: ProductsType) => {
    const response = await axiosUser.post("/product/create", data)
    return response?.data
}

// ========== UPDATE ==========
export const updateProduct = async (data: ProductsType) => {
    const { id } = data
    delete (data as any).id
    const response = await axiosUser.put(`/product/update/${id}`, data)
    return response?.data
}

// ========== DELETE ==========
export const deleteProduct = async (id: string | undefined ) => {
    const response = await axiosUser.delete(`/product/delete/${id}`)
    return response?.data
}

// ========== UPLOAD IMAGE ==========
export const uploadImage = async (data: any) => {
    return await axiosUser.post("/minio/media", data);
 };