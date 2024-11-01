import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { SignInType, SignUpType } from "../types"
import { signIn, signUp } from "../service"
import { Notification } from "../../../utils"
import { Token } from "../../../utils/tokens"


export function useSignIn() {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data: SignInType) => signIn(data),
        onSuccess: (response) => {
            console.log(response);
            const access_token = response?.data?.AccessToken
            Token(access_token)
            navigate("/user-layout")
            Notification("success", response?.data?.Message)
        },
    })
}

// ======= Sign Up ==========
export function useSignUpMutation(){
    return useMutation({
        mutationFn: (data: SignUpType): any => signUp(data)
    })
}