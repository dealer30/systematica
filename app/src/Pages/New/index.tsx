import { useEffect, useState } from "react";
import Container from "../../Components/Dashboard/Container";
import Header from "../../Components/Dashboard/ContainerHeader";
import { authapi } from "../../Services/api";
import loadingSvg from '../../Routes/loading.svg'
import './index.css'
import SystemData from "./SystemData";
import EditFooter from "../../Components/Dashboard/EditFooter";
import SubmitButton from "./SubmitButton";
import NewProvider from "../../Contexts/new";
import { TiArrowBack } from "react-icons/ti";

function New() {
    const [loading, setLoading] = useState(true);

    // Esse useEffect é responsável por verificar se o usuário está autenticado e se ele é um super administrador.
    // Se não for, ele redireciona para a página de home.
    useEffect(()=> {
        authapi.get('/auth/profile').then(response => {
            if (response.data.role !== 'Super Administrator') {
                window.location.assign('/home')
            } else {
                setLoading(false)
            }
        })
    }, [])

    // Esse componente é responsável por organizar a página de adição de um novo sistema.
    // Ele renderiza o componente de formulário de sistema e o botão de submissão.
    // É interessante nesse caso a utilização de um contexto, pois o formulário de sistema
    // é utilizado em outras páginas, e assim, é possível reutilizar o código.

    return (
        <Container>
                {loading ? <img id="loading" src={loadingSvg} /> : (
            <NewProvider>
                <Header title="Manter Sistema" />
                    <div className="control">
                        <SystemData/>
                    </div>
                <EditFooter>
                    <button className="edit-button" onClick={() => window.location.assign('/home')}><TiArrowBack id="icon"/> Voltar</button>
                    <SubmitButton />
                </EditFooter>
            </NewProvider>
                )}
        </Container>
    )
}

export default New;
