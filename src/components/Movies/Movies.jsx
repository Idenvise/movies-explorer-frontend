import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'

function Movies(props) {
  const {movies, getMovies, preloader, preloaderState, notFoundVisibility, requestError, setShortMovieTrue, setShortMovieFalse, shortMovie, setSavedMovies, savedMovies} = props;
  return(
    <section className='movies-page' aria-label='Старница фильмы'>
      <SearchForm getMovies={getMovies} preloader={preloader} setShortMovieFalse={setShortMovieFalse} setShortMovieTrue={setShortMovieTrue} shortMovie={shortMovie} />
      <MoviesCardList movies={movies} preloaderState={preloaderState} notFoundVisibility={notFoundVisibility} requestError={requestError} shortMovie={shortMovie} setSavedMovies={setSavedMovies} savedMovies={savedMovies}/>
    </section>

  )
}

export default Movies