import { useState } from "react";
import Search from "./search.svg"
import MovieCard from "./MovieCard";
const API_URL = 'http://www.omdbapi.com/?apikey=d103e611'


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([])
    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        if (data) {
            setMovies(data.Search)
        } else {
            setMovies([])
        }
        setSearchTerm('')
    }
    return (
        <main className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search For Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={Search}
                    alt="Search"
                    onClick={() => searchMovie(searchTerm)}
                />
            </div>
            {movies?.length > 0 ?
                (
                    <div className="container">
                        {movies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </main>
    )
}

export default App