import type { UserRegisterRequest } from "../models/request/user-register"
import type { ApiResponse } from "../models/response/api"
import type { UserInfo } from "../models/response/user-info"
import baseApi, { createApiWithToken } from "./base"


export const userRegister = async (req : UserRegisterRequest) : Promise<ApiResponse<boolean>>  => {
    const res = await baseApi.post('/users/register', req)
    return res.data
}

export const getUserProfile = async (token: string) : Promise<ApiResponse<UserInfo>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/users/profile')
    return res.data
}
