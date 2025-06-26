export interface UpdateItemRequest {
    id: number
    name?: string
    description?: string
    deadline?: string
    isDone?: boolean
    finishedDate?: string
}