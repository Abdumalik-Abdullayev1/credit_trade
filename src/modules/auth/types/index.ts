export interface SignInType {
    username: string,
    password: string
}

export interface SignUpType extends SignInType{
    full_name: string,
    phone_number: string,
    email:string,
    address: string,
}