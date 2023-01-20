import warning from './warning.svg'
import './index.css'
import { api } from '../../Services/api';

// Esse é um componente que eu criei para mostrar erros de requisição.
// Ele recebe o código de erro como parâmetro e mostra uma imagem de erro
// e uma mensagem de erro.
// Ele também verifica se o usuário está autenticado, e se estiver, ele redireciona
// para a página de home.
function Error (props: any) {
    const token = sessionStorage.getItem('token');

    if (token !== null) {
        api.get('/auth/profile', { headers: { Authorization: `Bearer ${token}`}}).then((response) => {
            if (response.status === 200) {
                window.location.href = '/home';
            } else {
                sessionStorage.removeItem('token');
            }
        })
    }

    return (
        <div className='error-container'>
            <h1>Erro {props.error}</h1>
            <img src={warning} alt="Error Image" className='error-image'/>
            <p>Cheque <a href='https://restfulapi.net/http-status-codes/'>https://restfulapi.net/http-status-codes/</a>
            para saber mais sobre esse erro ou <a href='/'>volte para a página de login.</a></p>
        </div>
    )
}

export default Error;
