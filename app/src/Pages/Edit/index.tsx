import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "../../Components/Dashboard/Container";
import Header from "../../Components/Dashboard/ContainerHeader";
import { authapi } from "../../Services/api";
import loadingSvg from '../../Routes/loading.svg'
import './index.css'
import SystemData from "./SystemData";
import EditFooter from "../../Components/Dashboard/EditFooter";
import SystemControl from "./SystemControl";
import EditProvider from "../../Contexts/edit";
import SubmitButton from "./SubmitButton";
import { TiArrowBack } from "react-icons/ti";

function Edit() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams<{ uuid: string }>();

    // Esse useEffect é responsável por carregar os dados do sistema que está sendo editado.
    // Ele faz uma requisição para a API e carrega os dados do sistema.
    useEffect(()=> {
        authapi.get(`/systems/?uuid=${uuid}`).then(response => {
            setData(response.data);
            setLoading(false);
        })
    }, [])

    // Esse componente é responsável por organizar a página de edição de um sistema.
    // Ele renderiza o componente de formulário de sistema, o componente de controle de sistema
    // e o botão de submissão.
    // É interessante nesse caso a utilização de um contexto, pois o formulário de sistema
    // é utilizado em outras páginas, e assim, é possível reutilizar o código.
    return (
        <Container>
                {loading ? <img id="loading" src={loadingSvg} /> : (
            <EditProvider data={data}>
                <Header title="Manter Sistema" />
                    <div className="control">
                        <SystemData/>
                        <SystemControl/>
                    </div>
                <EditFooter>
                    <button className="edit-button" onClick={() => window.location.assign('/home')}><TiArrowBack id="icon"/> Voltar</button>
                    <SubmitButton />
                </EditFooter>
            </EditProvider>
                )}
        </Container>
    )
}

export default Edit;
