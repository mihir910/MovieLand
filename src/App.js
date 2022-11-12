import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=3b1e7f5"
const App = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (searchText) => {

    if(searchText === "") {
      return
    }

    const response = await fetch(`${API_URL}&s=${searchText}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies("Spiderman");
  }, [])

  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies.length > 0 ? (
           <div className='container'>
            {movies.map((movie, i) => (
              <MovieCard movie={movie} key={i}/>
            ))}
          </div>
        ) : (
           <div className='emtyp'>        
            <h1>No Movies Found</h1>
          </div>
        )
      }
     
    </div>
  );
}

export default App;
