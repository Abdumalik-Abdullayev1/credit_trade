import { axiosInstance } from "@api";
import { SignInType, SignUpType } from "../types";

// ========== SignIn ==========
export async function signIn (data: SignInType){
    return await axiosInstance.post("/user/login", data)
}

// ========== SignIn ==========
export async function signUp(data: SignUpType) {
    return await axiosInstance.post("/user/register", data);
 }
 
//  ========== VERIFY EMAIL ===========
 export async function verifyEmail(data: SignUpType) {
    return await axiosInstance.post("/user/verify_email", data);
 }