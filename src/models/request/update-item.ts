export interface UpdateItemRequest {
    id: number
    name?: string
    description?: string
    deadline?: Date
    isDone?: boolean
    finishedDate?: Date
}