import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../Contexts/auth";

// Rota privada a autenticação do usuário.
// @ts-ignore
export const PrivateRoute = ({children}) => {

    // @ts-ignore
    const {authenticated, loading} = useContext(AuthContext);

    if (loading) {
        return <img src='loading.svg'/>
    }

    //Se for autenticado, ele renderiza o componente na tela
    if (!authenticated) {
        return <Navigate to="/" />
    }

    return children

}
