import { filmContext } from 'react'
import { AuthContext } from '../Providers/AuthProvider'

export const filmAuth = () => {
    const auth = filmContext(AuthContext)
    return auth
}

export default filmAuth