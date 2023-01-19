import EditPencil from "./EditPencil"
import './index.css'

function ResultList (props: any) {
    if (props.results.length < 2) {
        return (
            <div id="not-found">
                Nenhum resultado encontrado...
            </div>
        )
    } else {
        return (
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Sigla</th>
                        <th>Email</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.results.map((result: any, index: any) => {
                        if (result['description']) {
                        return (
                            <tr className="result-item" key={index}>
                                <td>{result.description.toUpperCase()}</td>
                                <td>{result.acronym.toUpperCase()}</td>
                                <td>{result.email}</td>
                                <td>{result.url}</td>
                                <td>{result.status ? 'Ativo' : 'Cancelado'}</td>
                                <td><EditPencil uuid={result.uuid}/></td>
                            </tr>
                        )} else {
                            return
                        }
                    })
                }
                </tbody>
            </table>
        )
    }
}

export default ResultList
