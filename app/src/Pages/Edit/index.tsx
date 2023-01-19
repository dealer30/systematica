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

function Edit() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams<{ uuid: string }>();

    useEffect(()=> {
        authapi.get(`/systems/?uuid=${uuid}`).then(response => {
            setData(response.data);
            setLoading(false);
            console.log(response.data);
        })
    }, [])


    return (
        <Container>
            <Header title="Manter Sistema" />
            {loading ? <img id="loading" src={loadingSvg} /> : (
                <div className="control">
                    <SystemData data={data}/>
                    <SystemControl data={data}/>
                </div>
            )}
            <EditFooter>
                <button className="edit-button" onClick={() => window.location.assign('/home')}>Voltar</button>
                <button className="edit-button">Salvar</button>
            </EditFooter>
        </Container>
    )
}

export default Edit;
