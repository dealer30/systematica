import { useState } from "react"
import { authapi } from "../../../Services/api"
import ResultList from "../ResultList"
import './index.css'

function SearchForm () {
    const [descriptionSearch, setDescriptionSearch] = useState('')
    const [acronymSearch, setAcronymSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)

    const handleSearch = (e: any) => {
        e.preventDefault()

        authapi.post('/systems/search', { description: descriptionSearch, acronym: acronymSearch, email: emailSearch }).then(response => {
            setSearchResults(Object.values(response.data));
        })
    }

    const handleClean = (e: any) => {
        e.preventDefault()

        setSearchResults([])
    }

    return (
        <div className="search-container">
            <header className="search-header">
                <p>Pesquisar Sistema</p>
            </header>
            <div className="search-body">
                <div className="search-form">
                    <p className="search-header-text">Filtro de Consulta</p>
                        <div className="search-query">
                            <div className="search-query-item">
                                <p>Descrição</p>
                                <input type="text" placeholder="Pesquisar por descrição" value={descriptionSearch} onChange={(e) => setDescriptionSearch(e.target.value)}/>
                            </div>
                            <div className="search-query-item">
                                <p>Sigla</p>
                                <input type="text" placeholder="Pesquisar por sigla" value={acronymSearch} onChange={(e) => setAcronymSearch(e.target.value)}/>
                            </div>
                            <div className="search-query-item">
                                <p>Email</p>
                                <input type="text" placeholder="Pesquisar por email" value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)}/>
                            </div>
                        </div>
                </div>
                <div className="result-container">
                    <p className="search-header-text">Filtro de Consulta</p>
                    <ResultList results={searchResults}/>
                </div>
            </div>
            <footer className="search-footer">
                <button className="search-button" onClick={handleSearch}>Pesquisar</button>
                <button className="search-button" onClick={handleClean}>Limpar</button>
                <button className="search-button">Novo Sistema</button>
            </footer>
        </div>
    )
}

export default SearchForm
