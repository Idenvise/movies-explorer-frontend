import React from 'react'
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import MoviesCard from './MoviesCard/MoviesCard'
import './MoviesCardList.css'

function MoviesCardList() {
  const [width, setWidth]   = React.useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(width)
  }, [window.innerWidth]);

const cards = [<MoviesCard key='1'/>,
               <MoviesCard key='2'/>,
               <MoviesCard key='3'/>,
               <MoviesCard key='4'/>,
               <MoviesCard key='5'/>,
               <MoviesCard key='6'/>,
               <MoviesCard key='7'/>,
               <MoviesCard key='8'/>,
               <MoviesCard key='9'/>,
               <MoviesCard key='10'/>,
               <MoviesCard key='11'/>,
               <MoviesCard key='12'/>,]
  return(
    <section className='cards'>
      <div className='card-list'>
        <Switch>
          <Route path='/movies'>
            {(width > 769) ? cards.map((card) => {return card}) : ''}
            {(width < 769 && width > 450) ? cards.slice(4).map((card) => {return card}) : ''}
            {(width < 451) ? cards.slice(7).map((card) => {return card}) : ''}
          </Route>
          <Route path='/saved-movies'>
            {(width > 320) ? cards.slice(9).map((card) => {return card}) : ''}
            {(width < 321) ? cards.slice(10).map((card) => {return card}) : ''}
          </Route>
        </Switch>

      </div>
      <Switch>
        <Route path='/movies'>
          <button className='card-list__more' type='button'>Ещё</button>
        </Route>
      </Switch>

    </section>
  )
}
export default MoviesCardList