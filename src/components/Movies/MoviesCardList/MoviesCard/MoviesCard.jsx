import './MoviesCard.css'
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function MoviesCard(props) {
  const {image, title, duration, trailerLink, preloaderState} = props;
  const [isLiked, setLike] = React.useState(false);
  const [crossVisible, setCrossVisible] = React.useState(false);
  function onLike() {
    isLiked ? setLike(false) : setLike(true);
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