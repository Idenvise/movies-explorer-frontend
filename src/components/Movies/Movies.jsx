import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'

function Movies(props) {
  const {
    getMovies,
    preloader,
    preloaderState,
    requestError,
    setShortMovieTrue,
    setShortMovieFalse,
    shortMovie,
    setSavedMovies,
    savedMovies,
    newMovies,
    logOut,
    clearStates,
    filteredSavedMovies,
    setFilteredSavedMovies,
    notFoundVisible
  } = props;
  return(
    <section className='movies-page' aria-label='Старница фильмы'>
      <SearchForm
        getMovies={getMovies}
        preloader={preloader}
        setShortMovieFalse={setShortMovieFalse}
        setShortMovieTrue={setShortMovieTrue}
        shortMovie={shortMovie}
        clearStates={clearStates}
      />
      <MoviesCardList
        preloaderState={preloaderState}
        notFoundVisible={notFoundVisible}
        requestError={requestError}
        shortMovie={shortMovie}
        setSavedMovies={setSavedMovies}
        savedMovies={savedMovies}
        newMovies={newMovies}
        logOut={logOut}
        clearStates={clearStates}
        filteredSavedMovies={filteredSavedMovies}
        setFilteredSavedMovies={setFilteredSavedMovies}
      />
    </section>

  )
}

export default Movies