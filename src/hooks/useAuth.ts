import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export type TypeHookAuth = {
    isAuth: boolean,
    email: string | null,
    token: string | null,
    id: string | null
}

export const useAuth = (): TypeHookAuth => {
    const {email, token, id} = useSelector((state: RootState) => state.user) 

    return {
        isAuth: !!email,
        email,
        token,
        id
    }
}