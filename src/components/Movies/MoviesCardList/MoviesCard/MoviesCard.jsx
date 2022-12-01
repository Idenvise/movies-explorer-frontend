import './MoviesCard.css'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../../../context/currentUserContext';
import { mainApi } from '../../../../utils/MainApi';
import { useEffect } from 'react';

function MoviesCard(props) {
  const {title, preloaderState, movie, setSavedMovies, savedMovies, url} = props;
  const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id: movieId} = movie;
  const [isLiked, setLike] = React.useState(false);
  const [crossVisible, setCrossVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (savedMovies.some(movie => movie.movieId === movieId)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [savedMovies])


  function onLike() {

    if (isLiked === true || window.location.pathname === '/saved-movies') {
      const movie = savedMovies.filter((movie) => movie.movieId === movieId);
      console.log(savedMovies);
      console.log(movieId)
      console.log(movie);
      const dbId =  window.location.pathname === '/saved-movies' ? movie[0].movieId : movie[0]._id;
      mainApi.deleteMovie(dbId)
      .then(() => {
        setLike(false);
        setSavedMovies(savedMovies.filter((movie) => {return movie.movieId !== movieId}));
      })
      .catch(err => {return Promise.reject(err)});
      return;
    }
    if (isLiked !== true) {
       mainApi.postMovie(country, director, duration, year, description, url+image.url, trailerLink, nameRU, nameEN, url+image.formats.thumbnail.url, movieId)
      .then((movie) => {
        setLike(true);
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => {return Promise.reject(err)});
      return;
    }
  }

  function deleteCrossVisible() {
    setCrossVisible(false);
  }
  function setCrossVis() {
    setCrossVisible(true);
  }
  function time() {
    const hours = Math.trunc(duration/60) ;
    const minutes = duration%60;
    return hours+'ч '+minutes+'м'
  }
  return(
    <article className={`movies__card ${preloaderState ? 'movies__card_invisible' : ''}`} onMouseOver={setCrossVis} onMouseOut={deleteCrossVisible}>
      <a href={trailerLink} rel='noreferrer' target='_blank'>
        <img className='movies__pic' src={window.location.pathname === '/movies' ? url+image.url : image} alt='Картинка фильма' />
      </a>
      <div className='movies__wrapper' >
        <h2 className='movies__title'>{title}</h2>
        <Switch>
          <Route path='/movies'>
            <button className={`movies__like ${isLiked ? 'movies__like_active' : ''}`} type='button' onClick={onLike}/>
          </Route>
          <Route path='/saved-movies'>
            <button className={`movies__delete ${crossVisible ? 'movies__delete_visible' : ''}`} type='button' onClick={onLike}/>
          </Route>
        </Switch>
      </div>
      <p className='movies__duration'>{time()}</p>
    </article>
  )
}

export default MoviesCard