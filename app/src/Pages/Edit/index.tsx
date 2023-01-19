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

    useEffect(()=> {
        authapi.get(`/systems/?uuid=${uuid}`).then(response => {
            setData(response.data);
            setLoading(false);
        })
    }, [])

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
