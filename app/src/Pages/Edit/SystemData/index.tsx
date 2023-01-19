import { useState } from "react";
import './index.css'

function SystemData(props: any) {
    const [description, setDescription] = useState(props.data.description);
    const [acronym, setAcronym] = useState(props.data.acronym);
    const [email, setEmail] = useState(props.data.email);
    const [url, setUrl] = useState(props.data.url);
    const [loading, setLoading] = useState(false);

    return (
        <div className="system-data-body">
            <div className="system-data">
                <div className="system-data-form">
                    <div className="system-data-item">
                        <p>Descrição</p>
                        <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Sigla</p>
                        <input type="text" placeholder="Sigla" value={acronym} onChange={(e) => setAcronym(e.target.value)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Email</p>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="system-data-item">
                        <p>URL</p>
                        <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SystemData
