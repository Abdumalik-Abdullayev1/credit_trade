import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { SignInType, SignUpType } from "../types"
import { signIn, signUp, verifyEmail } from "../service"
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
export function useSignUpMutation() {
    return useMutation({
       mutationFn: (data: SignUpType) => signUp(data),
       onSuccess: (response) => {
        Notification("success", response?.data?.Message)
       },
       onError: (err) => {
        Notification("error", err?.message)
       },
    });
 }

//  =========== VERIFY EMAIL =========
export function useEmailMutation() {
    const navigate = useNavigate();
    return useMutation({
       mutationFn: (data: SignUpType) => verifyEmail(data),
       onSuccess: (response) => {
          const access_token = response.data?.AccessToken;
          Token(access_token);
          navigate("/layout");
          Notification("success", response?.data)
       },
       onError: (err) => {
        Notification("success", err?.message)
       },
    });
 }