import React from 'react'
import { useEffect } from 'react'
import MoviesCard from './MoviesCard/MoviesCard'
import './MoviesCardList.css'

function MoviesCardList() {
  return(
    <section className='cards'>
      <div className='card-list'>
        <MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard /><MoviesCard />
      </div>
      <button className='card-list__more' type='button'>Ещё</button>
    </section>
  )
}
export default MoviesCardList