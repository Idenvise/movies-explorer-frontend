import MoviesCard from './MoviesCard/MoviesCard'
import './MoviesCardList.css'

function MoviesCardList() {
  return(
    <section className='card-list'>
      <MoviesCard /><MoviesCard /><MoviesCard />
    </section>
  )
}
export default MoviesCardList