import { createContext, useState, useContext, useEffect } from "react"
import type { ItemResponse } from "../models/response/item"
import type { PropsWithChildren } from "react"
import { useAuth } from "./AuthContext"
import { getAllItems } from "../apis/item"

export type ItemContextType = {
    items: ItemResponse[]
    setItems: React.Dispatch<React.SetStateAction<ItemResponse[]>>
    displayedItems: ItemResponse[]
    setDisplayedItems: React.Dispatch<React.SetStateAction<ItemResponse[]>>
    itemsLoading: boolean
    setItemsLoading: (state: boolean) => void
    finished: boolean
    setFinished: React.Dispatch<React.SetStateAction<boolean>>
    keyword: string
    setKeyword: React.Dispatch<React.SetStateAction<string>>
    process: number
}

const ItemsContext = createContext<ItemContextType | undefined>(undefined)

export const ItemsProvider = ({ children }: PropsWithChildren<{}>) => {
    const { jwt, jwtLoading } = useAuth()

    const [items, setItems] = useState<ItemResponse[]>([])
    const [displayedItems, setDisplayedItems] = useState<ItemResponse[]>([])
    const [itemsLoading, setItemsLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [process, setProcess] = useState(0)

    useEffect(() => {
        setDisplayedItems(
            items.filter(it =>
                it.isDone === finished &&
                (keyword.trim() === '' || it.name.toLowerCase().includes(keyword.toLowerCase()))
            )
        );
    }, [keyword, finished, items]);

    useEffect(() => {
        if (!jwt || jwtLoading) return

        const fetchItems = async () => {
            try {
                setItemsLoading(true)
                const res = await getAllItems(jwt)
                if (res.status === 200) {
                    setItems(res.data)
                }
            } catch (e) {
                console.error('Fetch items failed.', e)
            } finally {
                setItemsLoading(false)
            }
        }

        fetchItems()

    }, [jwt, jwtLoading])

    useEffect(() => {
        if (items.length === 0) return
        const total = items.length
        const fn = items.filter(it => it.isDone).length
        setProcess(Math.floor(fn * 100 / total))
    }, [items])

    return (
        <ItemsContext.Provider value={{ items, setItems, displayedItems, setDisplayedItems, itemsLoading, setItemsLoading, finished, setFinished, keyword, setKeyword, process }}>
            {children}
        </ItemsContext.Provider>
    )
}

export const useItems = () => {
    const ctx = useContext(ItemsContext)
    if (!ctx) throw new Error("useItems must be used inside an <ItemsProvider>")
    return ctx
}