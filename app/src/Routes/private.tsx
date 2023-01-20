import { useContext } from "react";
import { Navigate } from "react-router-dom";
import loadingSvg from './loading.svg'

import { AuthContext } from "../Contexts/auth";

// Componente responsável por verificar se o usuário está autenticado.
// @ts-ignore
export const PrivateRoute = ({children}) => {

    // @ts-ignore
    const {authenticated, loading} = useContext(AuthContext);

    if (loading) {
        return <img src={loadingSvg}/>
    }

    // Se for autenticado, ele renderiza o componente na tela
    // Se não, ele redireciona para a página de login
    if (!authenticated) {
        return <Navigate to="/" />
    }

    return children

}
