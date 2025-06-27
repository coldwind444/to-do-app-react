import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import type { LoginRequest } from "../models/request/login"
import { refreshToken, login as userLogin, logout as userLogout } from "../apis/auth"
import { useNavigate } from "react-router-dom"

export type AuthContextType = {
    jwt: string
    setJwt: React.Dispatch<React.SetStateAction<string>>
    jwtLoading: boolean
    setJwtLoading: React.Dispatch<React.SetStateAction<boolean>>
    login: (req: LoginRequest) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const navigate = useNavigate()

    const [jwt, setJwt] = useState(() => localStorage.getItem('jwt') || '')
    const [jwtLoading, setJwtLoading] = useState(false)

    const login = async (req: LoginRequest) => {
        try {
            setJwtLoading(true)
            const res = await userLogin(req)
            if (res.status === 200) {
                setJwt(res.data.jwt)
                navigate('/app')
            }
        } catch (e) {
            console.error('Login failed.', e)
        } finally {
            setJwtLoading(false)
        }
    }

    const logout = async () => {
        try {
            setJwtLoading(true)
            const res = await userLogout(jwt)
            if (res.data) {
                setJwt('')
                navigate('/')
            }
        } catch (e) {
            console.error('Login failed.', e)
        } finally {
            setJwtLoading(false)
        }
    }

    useEffect(() => {
        if (jwt) {
            localStorage.setItem('jwt', jwt)
        } else {
            localStorage.removeItem('jwt')
            navigate('/')
        }
    }, [jwt])

    useEffect(() => {
        if (!jwt) return

        const interval = setInterval(async () => {
            try {
                const res = await refreshToken(jwt, true)
                if (res.status === 200) setJwt(res.data.jwt)
                else await logout()
            } catch (e) {
                console.error('Refresh token failed.', e)
                await logout()
            }
        }, 1000 * 60 * 30)

        return () => clearInterval(interval)
    }, [jwt])

    return (
        <AuthContext.Provider value={{ jwt, setJwt, jwtLoading, setJwtLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider>")
    return ctx
}
