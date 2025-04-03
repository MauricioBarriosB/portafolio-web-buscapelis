function ListOfMovies({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li className='movie' key={movie.id}>
                        <h3>{movie.title} ({movie.year}) </h3>
                        <img src={movie.image} alt={movie.title} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return (
        <p className="message">No se han encontrado películas.</p>
    )
}

export function Movies({ movies }) {
    console.log('componente movies');
    const hasMovies = movies?.length > 0
    return (hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />)
}