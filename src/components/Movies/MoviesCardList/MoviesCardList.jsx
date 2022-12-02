import React from 'react'
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import MoviesCard from './MoviesCard/MoviesCard'
import './MoviesCardList.css'
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const imageURL = 'https://api.nomoreparties.co'
  const {movies, preloaderState, notFoundVisibility, requestError, shortMovie, setSavedMovies, savedMovies, setMovies} = props;
  const [width, setWidth]   = React.useState(window.innerWidth);
  const [showMovies, setShowMovies] = React.useState([]);
  const [showSavedMovies, setShowSavedMovies] = React.useState([]);
  const [preparedMovies, setPreparedMovies] = React.useState([]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);

  useEffect(() => {
    shortMovie ? setPreparedMovies(movies.filter(movie => movie.duration <= 40)) : setPreparedMovies(movies);
  }, [movies, shortMovie]);

  useEffect(() => {
    shortMovie ? setShowSavedMovies(savedMovies.filter(movie => movie.duration <= 40)) : setShowSavedMovies(savedMovies);
  }, [savedMovies, shortMovie])

  useEffect(() => {
    if (width>768) {
      setShowMovies(preparedMovies.slice(0,12).map(movie => {return movie}))
      return
    };
    if (width<769 && width>481) {
      setShowMovies(preparedMovies.slice(0,8).map(movie => {return movie}))
      return
    };
    if (width<481) {
      setShowMovies(preparedMovies.slice(0,5).map(movie => {return movie}))
      return
    };
  }, [preparedMovies]);

  function addCards() {
    if (width>768) {
      setShowMovies([...showMovies, ...preparedMovies.slice(showMovies.length, showMovies.length+3).map(movie => {return movie})]);
      return;
    }
    if (width<769) {
      setShowMovies([...showMovies, ...preparedMovies.slice(showMovies.length, showMovies.length+2).map(movie => {return movie})]);
      return;
    };
  }

  useEffect(() => {
    if (localStorage.getItem('movies') !== null) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }
    }, []);

  useEffect(() => {
    movies.length > 0 && localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies])


  return(
    <section className='cards'>
      <div className={`card-list ${showMovies.length === 0 ? 'card-list_flex' : ''} ${preloaderState ? 'card-list_flex' : ''}`}>
        <Switch>
          <Route path='/movies'>
            {preloaderState ? <Preloader/> : ''}
            {notFoundVisibility ? <p className={`card-list__notfound ${showMovies.length === 0 && requestError === false ? 'card-list__notfound_visible' : ''}`}>Ничего не найдено</p> : ''}
            {requestError ? <p className='card-list__error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : ''}
            {showMovies.map(movie => {return(<MoviesCard key={movie.id} id={movie.id} savedMovies={savedMovies} url={imageURL} setSavedMovies={setSavedMovies} movie={movie} title={movie.nameRU} preloaderState={preloaderState}/>)})}
          </Route>
          <Route path='/saved-movies'>
            {preloaderState ? <Preloader/> : ''}
            {notFoundVisibility ? <p className={`card-list__notfound ${showMovies.length === 0 && requestError === false ? 'card-list__notfound_visible' : ''}`}>Ничего не найдено</p> : ''}
            {requestError ? <p className='card-list__error'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : ''}
            {showSavedMovies.map(movie => {return(<MoviesCard key={movie.movieId} id={movie.movieId} url={imageURL} savedMovies={savedMovies} setSavedMovies={setSavedMovies} movie={movie} title={movie.nameRU} preloaderState={preloaderState}/>)})}
          </Route>
        </Switch>
      </div>
        <button className={`card-list__more ${window.location.pathname === '/movies' && preparedMovies.length > showMovies.length ? 'card-list__more_visible' : ''}`} type='button' onClick={addCards}>Ещё</button>
    </section>
  )
}
export default MoviesCardList