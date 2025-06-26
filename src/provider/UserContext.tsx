import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useAuth } from "./AuthContext"
import type { UserInfo } from "../models/response/user-info"
import { getUserProfile } from "../apis/user"

export type UserContextType = {
    user: UserInfo | undefined
    userLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
    const { jwt, jwtLoading } = useAuth()

    const [user, setUser] = useState<UserInfo | undefined>(undefined)
    const [userLoading, setUserLoading] = useState(false)

    useEffect(() => {
        if (jwtLoading || !jwt) return

        const fetchUser = async () => {
            try {
                setUserLoading(true)
                const res = await getUserProfile(jwt)
                if (res.status === 200) setUser(res.data)
            } catch (e) {
                console.error('Cannot fetch user.', e)
            } finally {
                setUserLoading(false)
            }
        }

        fetchUser()

    }, [jwt, jwtLoading])

    return (
        <UserContext.Provider value={{ user, userLoading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("useUser must be used inside an <UserProvider>")
    return ctx
}