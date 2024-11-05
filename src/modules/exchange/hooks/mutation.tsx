import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExchangeType } from "../types";
import { createExchange, deleteExchange, updateExchange } from "../service";
import { Notification } from "@notifications";



// ========== CREATE ==========
export function useCreateExchange() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ExchangeType[]) => createExchange(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_exchanges"] })
            }
        }
    })
}

// ========== UPDATE ==========
export function useUpdateExchange() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: ExchangeType) => updateExchange(data),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_exchanges"] })
            }
        }
    })
}

// ========== DELETE ==========
export function useDeleteExchange() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string | undefined) => deleteExchange(id),
        onSuccess: (response) => {
            Notification('success', response?.message)
        },
        onSettled: (_, error) => {
            if (error) {
                Notification('error', error?.message)
            } else {
                queryClient.invalidateQueries({ queryKey: ["all_exchanges"] })
            }
        }
    });
}