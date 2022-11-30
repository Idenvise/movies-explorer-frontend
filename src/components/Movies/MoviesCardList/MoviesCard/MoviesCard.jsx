import './MoviesCard.css'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../../../context/currentUserContext';
import { mainApi } from '../../../../utils/MainApi';

function MoviesCard(props) {
  const {image, title, duration, trailerLink, preloaderState, id, movie, setSavedMovies, savedMovies, url} = props;
  const [isLiked, setLike] = React.useState(false);
  const [crossVisible, setCrossVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  function onLike() {
    console.log(movie)
    const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id: movieId} = movie;
    const thumbnail = url+image.formats.thumbnail.url;
    mainApi.postMovie(country, director, duration, year, description, url+image.url, trailerLink, nameRU, nameEN, thumbnail, movieId)
      .then((movie) => {
        setLike(true)
        setSavedMovies([...savedMovies, ...movie])
      })
      .catch((err) => {return Promise.reject(err)})
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
    <article id={id} className={`movies__card ${preloaderState ? 'movies__card_invisible' : ''}`} onMouseOver={setCrossVis} onMouseOut={deleteCrossVisible}>
      <a href={trailerLink} rel='noreferrer' target='_blank'>
        <img className='movies__pic' src={image} alt='Картинка фильма' />
      </a>
      <div className='movies__wrapper' >
        <h2 className='movies__title'>{title}</h2>
        <Switch>
          <Route path='/movies'>
            <button className={`movies__like ${isLiked ? 'movies__like_active' : ''}`} type='button' onClick={onLike}/>
          </Route>
          <Route path='/saved-movies'>
            <button className={`movies__delete ${crossVisible ? 'movies__delete_visible' : ''}`} type='button'/>
          </Route>
        </Switch>
      </div>
      <p className='movies__duration'>{time()}</p>
    </article>
  )
}

export default MoviesCard