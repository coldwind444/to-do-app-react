import type { LoginRequest } from "../models/request/login"
import baseApi, { createApiWithToken } from "./base"
import type { ApiResponse } from "../models/response/api"
import type { TokenResponse } from "../models/response/token"
import type { OtpRequest } from "../models/request/otp-get"
import type { OtpResponse } from "../models/response/otp"
import type { OtpConfirmRequest } from "../models/request/otp-confirm"
import type { ResetPasswordRequest } from "../models/request/password-reset"

export const login = async (req : LoginRequest) : Promise<ApiResponse<TokenResponse>> => {
    const res = await baseApi.post('/auth/login', req)
    return res.data
}

export const logout = async (token: string) : Promise<ApiResponse<boolean>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/auth/logout')
    return res.data
}

export const refreshToken = async (token: string, refresh: boolean) : Promise<ApiResponse<TokenResponse>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/auth/refresh-token', {
        params: {
            refresh: refresh
        }
    })
    return res.data
}

export const requestOtp = async (req: OtpRequest) : Promise<ApiResponse<OtpResponse>> => {
    const res = await baseApi.post('/auth/otp-request', req)
    return res.data
}

export const confirmOtp = async (req: OtpConfirmRequest) : Promise<ApiResponse<string>> => {
    const res = await baseApi.post('/auth/otp-confirm', req)
    return res.data
}

export const resetPassword = async (req: ResetPasswordRequest) : Promise<ApiResponse<boolean>> => {
    const res = await baseApi.post('/auth/reset-password', req)
    return res.data
}