import './index.css'

function SystemControl(props: any) {
    return (
        <div className="system-control-body">
            <div className="system-control">
                <div className="system-control-form">
                    <div className="system-control-item">
                        <p>Status</p>
                        <select>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>
                        </select>
                    </div>
                    <div className="system-control-item">
                        <p>Usuário responsável pela última alteração</p>
                        <input type="text" placeholder="Usuário responsável pela última alteração" value={props.data.update ? props.data.update.user_name : 'Não houve alteração.'} disabled/>
                    </div>
                    <div className="system-control-item">
                        <p>Data da última alteração</p>
                        <input type="text" placeholder="Data da última alteração" value={props.data.update.createdAt} disabled/>
                    </div>
                    <div className="system-control-item">
                        <p>Justificativa da última alteração.</p>
                        <input type="textarea" placeholder="Justificativa da última alteração." value={props.data.update.reason} disabled/>
                    </div>
                    <div className="system-control-item">
                        <p>Nova justificativa de alteração</p>
                        <input type="textarea" placeholder="Justificativa da última alteração." value={''} disabled/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SystemControl;
