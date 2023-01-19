import { useContext } from "react";
import { NewContext } from "../../../Contexts/new";
import './index.css'

function SystemData() {
    const { description, acronym, email, url, handleChange } = useContext(NewContext);

    return (
        <div className="system-data-body">
            <div className="system-data-title">
                <h6>Dados do Sistema</h6>
            </div>
                <div className="system-data-form">
                    <div className="system-data-item">
                        <p>Descrição<b id="red-asterix"> *</b></p>
                        <input type="text" placeholder="Descrição" name="description" value={description} maxLength={100} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Sigla<b id="red-asterix"> *</b></p>
                        <input type="text" placeholder="Sigla" name="acronym" value={acronym} maxLength={10} onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="system-data-item">
                        <p>Email</p>
                        <input type="text" placeholder="Email" name="email" value={email} maxLength={100} onChange={(e) => handleChange(e)}/>
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
