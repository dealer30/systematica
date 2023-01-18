import EditPencil from "./EditPencil"
import './index.css'

function ResultList (props: any) {
    if (props.results.length < 1) {
        return (
            <div>
                <p>Nenhum resultado encontrado</p>
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
                                <td>{result.description}</td>
                                <td>{result.acronym}</td>
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
