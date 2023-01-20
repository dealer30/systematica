import { useState } from 'react';
import './index.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api } from '../../Services/api';

// Esse componente é responsável por renderizar o formulário de login

function LoginForm () {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const MySwal = withReactContent(Swal)

    const handleSaveUser = (e: any) => {
        e.preventDefault();

        if (login === '' || password === '') {
            MySwal.fire({
                title: 'Atenção!',
                text: 'Preencha todos os campos',
                icon: 'warning',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#6aa76f',
            })
            return;
        } else {

            const data = {
                login, password
            }

            Swal.fire({
                didOpen: () => {
                    // @ts-ignore
                    Swal.showLoading()
                    api.post('/auth/login', data).then((response) => {
                        Swal.hideLoading()
                        console.log(response)
                        if (response.status >= 200) {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Login realizado com sucesso!',
                                icon: 'success',
                                timer: 1000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            }).then(()=> {
                                sessionStorage.setItem('token', response.data.access_token);
                                window.location.href = '/home';
                            })
                        } else {
                            throw new Error(response.data)
                        }
                    }).catch((error) => {
                        Swal.hideLoading()
                        Swal.fire(
                            {
                                text: error.response.data.message,
                                icon: 'error',
                                confirmButtonText: 'Continuar',
                                confirmButtonColor: '#6aa76f',
                                width: '400px',
                            }
                        )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
                })

        }
    }

    return (
            <form className="login-form">
                <h2 className="title">Login</h2>
                <div className="input-container">
                    <div className="input">
                        <label>Nome de Usuário</label>
                            <input id='login' name='login' value={login}
                            onChange={(event)=> setLogin(event.target.value)}
                            placeholder='Digite seu login aqui...'/>
                    </div>
                    <div className="input">
                        <label>Senha</label>
                            <input id='password' type="password" name='password'
                            onChange={(event)=> setPassword(event.target.value)}
                            placeholder='Digite sua senha aqui...'/>
                    </div>

                </div>
                <button type="submit" id="submit-button" onClick={handleSaveUser}>Entrar</button>
            </form>
    )
}

export default LoginForm
