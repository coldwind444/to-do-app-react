import { useEffect } from "react"
import { useAuth } from "../../provider/AuthContext"
import { useNavigate } from "react-router-dom"

export const OAuth2SuccessPage = () => {
    const { setJwt } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('jwt')
        if (token) {
            setJwt(token)
            setTimeout(() => navigate('/app'), 0)
        }
    }, [])

    return (
        <div></div>
    )
}