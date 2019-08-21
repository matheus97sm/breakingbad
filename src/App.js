import React, { useState, useEffect } from 'react';
import './Style.css';

import Characters from './components/Characters'
import api from './services/api.js'

import logo from './assets/logo.png'
import searchSvg from './assets/search.svg'

function App() {
  const [characters, setCharacters] = useState([])
  const [allCharacters, setAllCharacters] = useState([])
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState([])

  useEffect(() => {
    loadCharacters(8, page * 8)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [page])

  async function loadCharacters(limit, offset) {
    const response = await api.get(`?limit=${limit}&offset=${offset}`)

    setCharacters(response.data)
  }

  useEffect(() => {
    async function loadAllCharacters() {
      const response = await api.get('/')
  
      setAllCharacters(response.data)
    }

    loadAllCharacters()
  }, [])

  useEffect(() => {
    const filter = allCharacters.filter((char) => char.name.toLowerCase().indexOf(search) !== -1)

    setFilteredCharacters(filter)
  }, [search])

  return (
    <>
      <header className="header">
        <img src={logo} className="logo-header" alt="Logotipo Breaking Bad" />

        <form>
          <input 
            type="text" 
            name="search" 
            id="search" 
            placeholder="Pesquise os personagens"
            onChange={e => setSearch(e.target.value.toLowerCase())}
          />
          <label htmlFor="search"><img src={searchSvg} alt="Botão de pesquisa" /></label>
        </form>
      </header>

      <h2 className="title">{search !== '' ? `Resultados da pesquisa para: ${search}` : 'Personagens'}</h2>

      <Characters characters={search !== '' ? filteredCharacters : characters} />

      {
        search === '' && (
          <div className="buttons">
            <button className={page === 0 ? 'inactive' : undefined} onClick={() => page > 0 && setPage(page - 1)}>Página Anterior</button>
            <button className={page === 7 ? 'inactive' : undefined} onClick={() => page < 7 && setPage(page + 1)}>Próxima página</button>
          </div>
        )
      }
    </>
  );
}

export default App;
