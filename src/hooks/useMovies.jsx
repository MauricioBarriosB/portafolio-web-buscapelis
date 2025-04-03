import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return

        try {
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({ search }) // ** Extrae data desde el servicio
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    // ** Hook useMemo se usua para memorizar estado, y cambian dependiendo de las referencias (sort, movies)
    // ** Utilizar preferentemente para listas grandes de datos

    const sortedMovies = useMemo(() => {
        if (!movies) return;
        return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies // ** Sort viene por parametro (chechbox)
    }, [sort, movies])
    return { movies: sortedMovies, getMovies, loading }
}