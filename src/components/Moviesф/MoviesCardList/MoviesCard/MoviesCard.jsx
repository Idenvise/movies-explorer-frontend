import './MoviesCard.css'
import cardPic from '../../../../images/card_pic.png'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
function MoviesCard() {
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
  return(
    <article className='movies__card' onMouseOver={setCrossVis} onMouseOut={deleteCrossVisible}>
      <img className='movies__pic' src={cardPic} alt='Картинка фильма' />
      <div className='movies__wrapper' >
        <h2 className='movies__title'>33 слова о дизайне</h2>
        <Switch>
          <Route path='/movies'>
            <button className={`movies__like ${isLiked ? 'movies__like_active' : ''}`} type='button' onClick={onLike}/>
          </Route>
          <Route path='/saved-movies'>
            <button className={`movies__delete ${crossVisible ? 'movies__delete_visible' : ''}`} type='button'/>
          </Route>
        </Switch>
      </div>
      <p className='movies__duration'>1ч 47м</p>
    </article>
  )
}

export default MoviesCard