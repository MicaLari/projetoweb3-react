import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [filmLogged, setFilmLogged] = useState({
        isLogged: false,
        idFilm: '',
        token: '',
        role: '',
    });

    return (
        <AuthContext.Provider value={[filmLogged, setFilmLogged]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider