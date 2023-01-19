import { createContext, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { authapi } from '../Services/api';

export interface EditData {
    description: string;
    acronym: string;
    email: string;
    url: string;
    status: string;
    uuid: string;
    reason: string;
    update?: {
        user_name: string;
        createdAt: Date;
        reason: string;
    },
    handleChange: (e: any) => void;
    handleSubmit: () => any;
}

export const EditContext = createContext<EditData>({} as EditData);

const EditProvider = (props: any) => {
    const [description, setDescription] = useState(props.data['description']);
    const [acronym, setAcronym] = useState(props.data['acronym']);
    const [email, setEmail] = useState(props.data['email']);
    const [url, setUrl] = useState(props.data['url']);
    const [status, setStatus] = useState('none');
    const [uuid, setUuid] = useState(props.data['uuid']);
    const [update, setUpdate] = useState(props.data['update'] ? props.data['update'] : null);
    const [reason, setReason] = useState('');

    const MySwal = withReactContent(Swal)

    const handleSubmit = () => {
        if (reason == '' || status == 'none') {

            return MySwal.fire({
                title: 'Atenção!',
                text: 'Dados obrigatórios não informados.',
                icon: 'warning',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#6aa76f',
            })
        } else {
            const data = {
                description,
                acronym,
                email,
                url,
                status: status == 'true' ? true : false,
                reason
            }


            MySwal.fire({
                didOpen: () => {
                    // @ts-ignore
                    Swal.showLoading()
                    authapi.patch(`/systems/?uuid=${uuid}`, data).then((response) => {
                        Swal.hideLoading()
                        console.log(response)
                        if (response.status >= 200) {
                            Swal.fire({
                                title: 'Sucesso!',
                                text: 'Edição realizada com sucesso!',
                                icon: 'success',
                                timer: 1000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            }).then(()=> {
                                window.location.reload();
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
        <EditContext.Provider value={{
            description,
            acronym,
            email,
            url,
            status,
            uuid,
            update,
            reason,
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
                    case 'status':
                        setStatus(e.target.value);
                        break;
                    case 'reason':
                        setReason(e.target.value);
                        break;
                    default:
                        break;
                }
            },
            handleSubmit
            }}>
            {props.children}
            </EditContext.Provider>
    )
}

export default EditProvider;
