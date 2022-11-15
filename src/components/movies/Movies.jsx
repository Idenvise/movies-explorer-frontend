import SearchForm from './SearchForm/SearchFrom'
import MoviesCardList from './MoviesCardList/MoviesCardList'

function Movies() {

  return(
    <section className='movies-page' aria-label='Старница фильмы'>
      <SearchForm />
      <MoviesCardList />
    </section>

  )
}

export default Movies