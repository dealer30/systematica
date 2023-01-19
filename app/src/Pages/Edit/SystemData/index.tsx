import { useContext } from "react";
import { EditContext } from "../../../Contexts/edit";
import './index.css'

function SystemData() {
    const { description, acronym, email, url, handleChange } = useContext(EditContext);

    return (
        <div className="system-data-body">
                <div className="system-data-title">
                    <h6>Dados do Sistema</h6>
                </div>
                <div className="system-data-form">
                    <div className="system-data-item">
                        <p>Descrição</p>
                        <input type="text" placeholder="Descrição" name="description" value={description} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Sigla</p>
                        <input type="text" placeholder="Sigla" name="acronym" value={acronym} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Email</p>
                        <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="system-data-item">
                        <p>URL</p>
                        <input type="text" placeholder="URL" name="url" value={url} onChange={(e) => handleChange(e)}/>
                    </div>
                </div>
        </div>
    )
}


export default SystemData
