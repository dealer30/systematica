import { useEffect, useState } from "react"
import { authapi } from "../../../Services/api"
import ResultList from "./SearchBody/ResultList"
import './index.css'
import Container from "../../../Components/Dashboard/Container"
import Header from "../../../Components/Dashboard/ContainerHeader"
import Footer from "../../../Components/Dashboard/ContainerFooter"

function SearchContainer () {
    const [descriptionSearch, setDescriptionSearch] = useState('')
    const [acronymSearch, setAcronymSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setNumberPages] = useState(0)
    const [role, setRole] = useState('')

    useEffect(()=> {
        authapi.get('/auth/profile').then(response => {
            setRole(response.data.role)
        })
    })

    const handleSearch = (e: any) => {
        e.preventDefault()

        authapi.post(`/systems/search?page=${page}`, { description: descriptionSearch, acronym: acronymSearch, email: emailSearch }).then(response => {
            setSearchResults(Object.values(response.data));
            setNumberPages(response.data.pages);
        })
    }

    const handleClean = (e: any) => {
        e.preventDefault()

        setSearchResults([])
    }

    const switchPage = (num: number) => {
        setPage(page + num);

        authapi.post(`/systems/search?page=${page + num}`, { description: descriptionSearch, acronym: acronymSearch, email: emailSearch }).then(response => {
            setSearchResults(Object.values(response.data));
            setNumberPages(response.data.pages);
        })
    }

    return (
        <Container>
            <Header title="Pesquisar Sistema"/>
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
                    <p className="result-header-text">Resultado da Pesquisa</p>
                <div className="result-container">
                    <ResultList results={searchResults}/>
                </div>

                    {pages > 1 ? (
                        <div className="pagination-items">
                            { page != 1 ? (
                                <p id="pagination-control"onClick={() => switchPage(-1)}>{'<'}</p>
                            ): null}
                            <p>{page}</p>
                            { page != pages ? (
                                <p id="pagination-control" onClick={() => switchPage(1)}>{'>'}</p>
                            ): null}
                        </div>
                    ): null}

            </div>
            <Footer>
                <button id="search-button" onClick={handleSearch}>Pesquisar</button>
                <button id="search-button" onClick={handleClean}>Limpar</button>
                {
                    role === 'Super Administrator' ?
                    (
                        <button id="search-button">Novo Sistema</button>
                        ) : null
                    }
            </Footer>
        </Container>
    )
}

export default SearchContainer
