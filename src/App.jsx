import './App.css'
import { useMovies } from './hooks/useMovies.jsx'
import { Movies } from './components/Movies.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    // ** Validación del input :

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }
        if (search === '') {
            setError('No se puede buscar una película con el campo vacío.')
            return
        }
        if (search.match(/^\d+$/)) {
            setError('No se puede buscar una película con un número.')
            return
        }
        if (search.length < 3) {
            setError('La búsqueda debe tener al menos 3 caracteres.')
            return
        }
        setError(null)
    }, [search])
    return { search, updateSearch, error }
}

function App() {
    const [sort, setSort] = useState(false) // ** ordena las peliculas por nombre titulo
    const { search, updateSearch, error } = useSearch()
    const { movies, loading, getMovies } = useMovies({ search, sort }) // ** hook personalizado

    const debouncedGetMovies = useCallback(
        debounce(search => {
            console.log('search', search)
            getMovies({ search })
        }, 300)
        , [getMovies]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        getMovies({ search }) // ** desde el hooks useMovies.jsx
    }

    const handleSort = () => {
        setSort(!sort)
    }

    const handleChange = (event) => {
        const newSearch = event.target.value
        updateSearch(newSearch)
        debouncedGetMovies(newSearch)
    }

    return (
        <div className='page'>

            <div>
                <h3>La búsqueda se realizará mediante API Compilación de Películas 2025</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <input
                        style={{
                            border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'
                        }} onChange={handleChange} value={search} name='query' placeholder='Ingresar búsqueda...'
                    />
                    Ordenar por nombre <input type='checkbox' onChange={handleSort} checked={sort} />
                    <button type='submit'>Buscar</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <main>
                {
                    loading ? <p>Cargando...</p> : <Movies movies={movies} />
                }
            </main>
        </div>
    )
}

export default App