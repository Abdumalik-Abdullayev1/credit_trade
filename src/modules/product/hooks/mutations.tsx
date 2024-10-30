import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProductsType } from "../types";
import { createProduct, deleteProduct, updateProduct, uploadImage } from "../service";
import { Notification } from "../../../utils";


// ========== CREATE ==========
export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ProductsType) => createProduct(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_products"] })
            }
        }
    })
}
// ========== UPDATE ==========
export function useUpdateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ProductsType) => updateProduct(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_products"] })
            }
        }
    })
}
// ========== DELETE ==========
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_products"] })
            }
        }
    });
}

// ========== UPLOAD IMAGE ==========
export function useUploadImage() {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: (data: any) => uploadImage(data),
       onSettled: async (_, error) => {
          if (error) {
             Notification( "error", error?.message,);
          } else {
             await queryClient.invalidateQueries({ queryKey: ["made_url"] });
          }
       },
    });
 }