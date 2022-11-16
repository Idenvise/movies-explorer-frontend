import './MoviesCard.css'
import cardPic from '../../../../images/card_pic.png'
import React from 'react';
function MoviesCard() {
  const [isLiked, setLike] = React.useState(false);
  function onLike() {
    isLiked ? setLike(false) : setLike(true);
  }
  return(
    <article className='movies__card'>
      <img className='movies__pic' src={cardPic} alt='Картинка фильма' />
      <div className='movies__wrapper'>
        <h2 className='movies__title'>33 слова о дизайне</h2>
        <button className={`movies__like ${isLiked ? 'movies__like_active' : ''}`} type='button' onClick={onLike}/>
      </div>
      <p className='movies__duration'>1ч 47м</p>
    </article>
  )
}

export default MoviesCard