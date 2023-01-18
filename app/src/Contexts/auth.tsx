import { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import createSessionLogin from "../Services/login";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { LoginData } from "../Services/login";
import { authapi } from "../Services/api";

// @ts-ignore
export const AuthContext = createContext();

// @ts-ignore
export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    //Perfis começam como falso
    //Apenas quando autenticados são atualizados para true
    const [authenticated, setAuthenticated] = useState(false);

    //A verificação das rotas privadas é feita antes do useEffect
    //O loading serve pra impedir isso. Só é feita a análise se o usuário está logado ou não depois do useEffect
    const [loading, setLoading] = useState(true);

    //Persistência dos dados
    //Recupera os valores no sessionStorage e deixa o usuário logado
    useEffect(() => {

        //Recupera o token do SessionStorage
        const recoveredToken = sessionStorage.getItem("token");

        if (recoveredToken) {
            authapi.get('/auth/profile').then((response)=> {
                if (response.status === 200){
                    setAuthenticated(true);
                    setLoading(false);
                }
            }).catch(()=> {
                setAuthenticated(false);
                setLoading(false);
                sessionStorage.removeItem('token')
                navigate('/')
            })
        } else {
            setAuthenticated(false);
            setLoading(false);
        }

    }, []);

    const login = async ({login, password}: LoginData) => {

        const response = await createSessionLogin({login, password});

        // @ts-ignore
        const token = response.data.access_token;

        sessionStorage.setItem("token", token);

        if (token) {
            setAuthenticated(true);
            navigate("/home");
        }

    }

    const logout = () => {

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: <p>Você realmente deseja sair?</p>,
            showDenyButton: true,
            confirmButtonText: <p>Sim</p>,
            denyButtonText: <p>Não</p>,
          }).then((result) => {
            if (result.isConfirmed) {

                setAuthenticated(false);
                sessionStorage.removeItem("token");
                navigate("/");

            }
          })

        }

    return (

        <AuthContext.Provider value = {{
            authenticated,
            loading,
            login,
            logout }}>

{/* @ts-ignore */}
        {children}

        </AuthContext.Provider>

    )

}
