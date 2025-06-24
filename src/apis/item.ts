import type { CreateItemRequest } from "../models/request/create-item";
import type { UpdateItemRequest } from "../models/request/update-item";
import type { ApiResponse } from "../models/response/api";
import type { ItemResponse } from "../models/response/item";
import { createApiWithToken } from "./base";

export const getAllItems = async (token: string) : Promise<ApiResponse<ItemResponse[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/items')
    return res.data
}

export const updateItem = async (token: string, req: UpdateItemRequest) : Promise<ApiResponse<UpdateItemRequest>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/items/update', req)
    return res.data
}

export const getItemsByStatus = async (token: string, status: boolean) : Promise<ApiResponse<ItemResponse[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/items/status', {
        params: {
            s: status
        }
    })
    return res.data
}

export const searchItem = async (token: string, name: string) : Promise<ApiResponse<ItemResponse[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/items/search', {
        params: {
            name: name
        }
    })
    return res.data
}

export const createItem = async (token: string, req: CreateItemRequest) : Promise<ApiResponse<ItemResponse>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/items/create', req)
    return res.data
}

export const deleteItem = async (token: string, id: number) : Promise<ApiResponse<boolean>> => {
    const api = createApiWithToken(token)
    const res = await api.delete('/items/delete', {
        params: {
            id: id
        }
    })
    return res.data
}