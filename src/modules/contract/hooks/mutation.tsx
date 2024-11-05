import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContractType } from "../types";
import { createContract, deleteContract, updateContract, uploadContractImg } from "../service";
import { Notification } from "@notifications";



// ========== CREATE ==========
export function useCreateContract() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ContractType) => createContract(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({queryKey: ['all_contracts']})
            }
        }
    })
}

// ========== UPDATE ==========
export function useUpdateContract() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ContractType) => updateContract(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_contracts"] })
            }
        }
    })
}

// ========== DELETE ==========
export function useDeleteContract() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | undefined) => deleteContract(id),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_contracts"] })
            }
        }
    });
}

// ========== UPLOAD IMAGE ==========
export function useContractImage() {
    const queryClient = useQueryClient();
    return useMutation({
       mutationFn: (data: any) => uploadContractImg(data),
       onSettled: async (_, error) => {
          if (error) {
             Notification( "error", error?.message,);
          } else {
             await queryClient.invalidateQueries({ queryKey: ["made_url"] });
          }
       },
    });
 }