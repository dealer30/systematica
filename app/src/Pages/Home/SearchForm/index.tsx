import { useState } from "react"
import { authapi } from "../../../Services/api"
import ResultList from "../ResultList"

function SearchForm () {
    const [descriptionSearch, setDescriptionSearch] = useState('')
    const [acronymSearch, setAcronymSearch] = useState('')
    const [emailSearch, setEmailSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)

    const handleSearch = (e: any) => {
        e.preventDefault()

        descriptionSearch != '' ?
        authapi.post(`/systems/search`, { query: 'description', value: descriptionSearch }).then((response) => {
            setSearchResults(searchResults.concat(response.data))
        }) : null;

        acronymSearch != '' ?
        authapi.post(`/systems/search`, { query: 'acronym', value: acronymSearch }).then((response) => {
            setSearchResults(searchResults.concat(response.data))
        }) : null;

        emailSearch != '' ?
        authapi.post(`/systems/search`, { query: 'email', value: emailSearch }).then((response) => {
            response.data['pages'] > 0 ?
            setSearchResults(searchResults.concat(response.data)) : null
        }) : null;
    }

    return (
        <div className="search-form">
            <form onSubmit={(e) => handleSearch(e)}>
                <input type="text" placeholder="Pesquisar por descrição" value={descriptionSearch} onChange={(e) => setDescriptionSearch(e.target.value)}/>
                <input type="text" placeholder="Pesquisar por sigla" value={acronymSearch} onChange={(e) => setAcronymSearch(e.target.value)}/>
                <input type="text" placeholder="Pesquisar por email" value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)}/>
                <button type="submit">Pesquisar</button>
            </form>
            <ResultList results={searchResults}/>
        </div>
    )
}

export default SearchForm
