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

    useEffect(()=> {
        authapi.get('/auth/profile').then(response => {
            if (response.data.role !== 'Super Administrator') {
                window.location.assign('/home')
            } else {
                setLoading(false)
            }
        })
    }, [])

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
