const API_URL = import.meta.env.VITE_APP_API_URL

const API_KEY = import.meta.env.VITE_APP_API_KEY_HASHED

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()
    const movies = json.Search
    console.log(json)
    
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error buscando películas...')
  }
}