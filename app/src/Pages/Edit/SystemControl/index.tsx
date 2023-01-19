import { useContext, useState } from 'react';
import { EditContext } from '../../../Contexts/edit';
import { formatDate } from './dateFunction';
import './index.css'

function SystemControl() {
    const [charLeft, setCharLeft] = useState(200);
    const { update, status, handleChange, reason } = useContext(EditContext)

    const handleReasonChange = (e: any) => {
        handleChange(e);
        setCharLeft(200 - e.target.value.length);
    }

    return (
        <div className="system-control-body">
            <div className="system-control-title">
                <h6>Controle do Sistema</h6>
            </div>
            <div className="system-control">
                <div className="system-control-form">
                    <div className="system-control-item">
                        <p>Status<b id="red-asterix"> *</b></p>
                        <select id="select" name="status" onChange={e => handleChange(e)} required>
                            <option value="none">Selecione!</option>
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </select>
                    </div>
                    <div className="system-control-item">
                        <p>Usuário responsável pela última alteração</p>
                        <input type="text" placeholder={update ? update.user_name : 'Não houve alteração.'} disabled/>
                    </div>
                    <div className="system-control-item">
                        <p>Data da última alteração</p>
                        <input type="text" placeholder={update ? formatDate(update.createdAt) : 'Não houve alteração.'} disabled/>
                    </div>
                    <div className="system-control-item">
                        <p>Justificativa da última alteração.</p>
                        <textarea id="reason-text" placeholder={update ? update.reason : 'Não houve alteração.'} disabled/>
                    </div>
                    <div className="system-control-item">
                        <div className="reason-text">
                            <p>Nova Justificativa da Alteração<b id="red-asterix"> *</b></p>
                            <p id='length-text' style={{color: charLeft === 0 ? "#e60000" : "#07aa01"}}>Quantidade de caracteres disponíveis: {charLeft}</p>
                        </div>
                        <textarea id="reason-text" name="reason" maxLength={200} value={reason} onChange={e => handleReasonChange(e)} required={true}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SystemControl;
