import { useEffect, useState } from "react"
import { authapi } from "../../../Services/api"
import ResultList from "./SearchBody/ResultList"
import './index.css'
import Container from "../../../Components/Dashboard/Container"
import Header from "../../../Components/Dashboard/ContainerHeader"
import Footer from "../../../Components/Dashboard/ContainerFooter"
import loadingSvg from '../../../Routes/loading.svg'

function SearchContainer () {
    const [descriptionSearch, setDescriptionSearch] = useState('')
    const [acronymSearch, setAcronymSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setNumberPages] = useState(0)
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true)

    // esse useEffect é responsável por carregar os dados da API
    // quando o componente é montado
    useEffect(()=> {
        authapi.get('/auth/profile').then(response => {
            setRole(response.data.role)
        })

        authapi.get('/systems/pages').then(response => {
            setNumberPages(response.data);
        })

        authapi.get('/systems/').then(response => {
            setSearchResults(Object.values(response.data));
            setLoading(false)
        });
    }, [])

    // essa função é responsável por fazer a busca
    // ela é chamada quando o usuário clica no botão de buscar
    const handleSearch = (e: any) => {
        e.preventDefault()

        setLoading(true);
        setPage(1);

        authapi.post(`/systems/search?page=${1}`, { description: descriptionSearch, acronym: acronymSearch, email: emailSearch }).then(response => {
            setSearchResults(Object.values(response.data));
            setNumberPages(response.data.pages);
            setLoading(false);
        })
    }

    // essa função é responsável por limpar os campos de busca
    // ela é chamada quando o usuário clica no botão de limpar
    const handleClean = (e: any) => {
        e.preventDefault()

        setLoading(true);
        setDescriptionSearch('')
        setAcronymSearch('')
        setEmailSearch('')

        authapi.get('/systems/pages').then(response => {
            setNumberPages(response.data);
        })

        authapi.get('/systems/').then(response => {
            setSearchResults(Object.values(response.data));
            setLoading(false)
        });
    }

    // essa função é responsável por mudar a página
    // ela é chamada quando o usuário clica no botão de mudar de página
    const switchPage = (num: number) => {
        setPage(page + num);

        authapi.post(`/systems/search?page=${page + num}`, { description: descriptionSearch, acronym: acronymSearch, email: emailSearch }).then(response => {
            setSearchResults(Object.values(response.data));
            setNumberPages(response.data.pages);
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <Container>
            <Header title="Pesquisar Sistema"/>
            <div className="search-body">
                <div className="search-form">
                    <p className="search-header-text no-select">Filtro de Consulta</p>
                        <div className="search-query">
                            <div className="search-query-item">
                                <p>Descrição</p>
                                <input type="text" placeholder="Pesquisar por descrição" value={descriptionSearch} maxLength={100} onChange={(e) => setDescriptionSearch(e.target.value)}/>
                            </div>
                            <div className="search-query-item">
                                <p>Sigla</p>
                                <input type="text" placeholder="Pesquisar por sigla" value={acronymSearch} maxLength={10} onChange={(e) => setAcronymSearch(e.target.value)}/>
                            </div>
                            <div className="search-query-item">
                                <p>Email</p>
                                <input type="text" placeholder="Pesquisar por email" value={emailSearch} maxLength={100} onChange={(e) => setEmailSearch(e.target.value)}/>
                            </div>
                        </div>
                </div>
                    <p className="result-header-text no-select">Resultado da Pesquisa</p>
                <div className="result-container">
                    {
                        loading ? (<img src={loadingSvg} id="loading"/>) :
                        (<ResultList results={searchResults}/>)
                    }
                </div>
                    {pages > 1 ? (
                        <div className="pagination-items no-select">
                            { page != 1 ? (
                                <p id="pagination-control"  onClick={() => switchPage(-1)}>{'<'}</p>
                            ): <p id="pagination-control-disabled">{'<'}</p>}
                            <p>{page}</p>
                            { page != pages ? (
                                <p id="pagination-control" onClick={() => switchPage(1)}>{'>'}</p>
                            ): <p id="pagination-control-disabled">{'>'}</p>}
                        </div>
                    ): null}

            </div>
            <Footer>
                <button id="search-button" onClick={handleLogout}>Deslogar</button>
                <div>
                <button id="search-button" onClick={handleSearch}>Pesquisar</button>
                <button id="search-button" onClick={handleClean}>Limpar</button>
                {
                    role === 'Super Administrator' ?
                    (
                        <button id="search-button" onClick={() => window.location.assign('../system/new')}>Novo Sistema</button>
                        ) : null
                    }
                </div>
            </Footer>
        </Container>
    )
}

export default SearchContainer
