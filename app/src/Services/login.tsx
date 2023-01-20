import { api } from "./api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface LoginData {
    login: string;
    password: string;
  }

// Função responsável por criar uma sessão de login.

const createSessionLogin = async ({login, password}: LoginData) => {

    try {
        const auth = await api.post('auth/login', {login, password});

        return auth;
    }

    catch (e: any) {

        if (e.response.status >= 400) {
            const MySwal = withReactContent(Swal);
            Swal.hideLoading()

            return Swal.fire(
                {
                    text: e.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#6aa76f',
                    width: '400px',
                }
            )
        };

        throw new Error("Erro não reconhecido", e);

    }
};

export default createSessionLogin;
