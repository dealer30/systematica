function ResultList ({ ...props }) {
    return (
        <div className="result-list">
            <ul>
                {props.results.map((result: any) => (
                    <li key={result.id}>
                        <h1>{result.description}</h1>
                        <p>{result.acronym}</p>
                        <p>{result.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ResultList
