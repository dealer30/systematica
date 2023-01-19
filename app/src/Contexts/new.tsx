import { createContext, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { authapi } from '../Services/api';

export interface NewData {
    description: string;
    acronym: string;
    email?: string;
    url?: string;
    handleChange: (e: any) => void;
    handleSubmit: () => any;
}

export const NewContext = createContext<NewData>({} as NewData);

const NewProvider = (props: any) => {
    const [description, setDescription] = useState('');
    const [acronym, setAcronym] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');

    const MySwal = withReactContent(Swal)

    const handleSubmit = () => {
        if (description == '' || acronym == '') {

            return MySwal.fire({
                title: 'Atenção!',
                text: 'Dados obrigatórios não informados.',
                icon: 'warning',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#6aa76f',
            })
        } else {
            const data: any = {
                description,
                acronym,
            }

            url == '' ? null : data.url = url;
            email == '' ? null  : data.email = email;


            MySwal.fire({
                didOpen: () => {
                    // @ts-ignore
                    Swal.showLoading()
                    authapi.post(`/systems/`, data).then((response) => {
                        Swal.hideLoading()
                        console.log(response)
                        if (response.status >= 200) {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Operação realizada com sucesso.',
                                icon: 'success',
                                timer: 1000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            }).then(()=> {
                                window.location.assign(`../system/edit/${response.data.uuid}`);
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
        <NewContext.Provider value={{
            description,
            acronym,
            email,
            url,
            handleChange: (e: any) => {
                e.preventDefault();
                switch (e.target.name) {
                    case 'description':
                        setDescription(e.target.value);
                        break;
                    case 'acronym':
                        setAcronym(e.target.value);
                        break;
                    case 'email':
                        setEmail(e.target.value);
                        break;
                    case 'url':
                        setUrl(e.target.value);
                        break;
                    default:
                        break;
                }
            },
            handleSubmit
            }}>
            {props.children}
            </NewContext.Provider>
    )
}

export default NewProvider;
