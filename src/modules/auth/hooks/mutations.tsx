import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { SignInType, SignUpType } from "../types"
import { signIn, signUp } from "../service"
import { Notification } from "../../../utils"
import { Token } from "../../../utils/tokens"


export function useSignIn() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: SignInType) => signIn(data),
        onSuccess: (response) => {
            console.log(response);
            const { AccessToken } = response?.data
            Token(AccessToken)
            navigate("/user-layout")
            Notification("success", response?.data?.Message)
        },
        onSettled: async (_,error)=>{
            if(error){
                Notification("error", error?.message)
            }else {
                await queryClient.invalidateQueries({queryKey: ["auth"]})
            }
        }
    })
}

// ======= Sign Up ==========
export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data: SignUpType): any => signUp(data)
    })
}