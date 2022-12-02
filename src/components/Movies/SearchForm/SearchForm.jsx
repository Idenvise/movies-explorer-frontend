import './SearchForm.css'
import searchIcon from '../../../images/search-icon.svg'
import searchIconWhite from '../../../images/search-icon_white.svg'
import React from 'react';
import { useEffect } from 'react';

function SearchForm(props) {
  const {getMovies, preloader, setShortMovieTrue, setShortMovieFalse, shortMovie} = props;
  const [movieTitle, setMovieTitle] = React.useState('');
  const [error, setError] = React.useState(false);

  function handleTitle(e) {
    setMovieTitle(e.target.value);
    localStorage.setItem('searchRequset', e.target.value);
  };

  function searchSubmit(e) {
    e.preventDefault();
    if (movieTitle === '') {
      return setError(true);
    }
    if (movieTitle !== '') {
      setError(false);
    }
    preloader();
    getMovies(movieTitle);
    localStorage.setItem('checkboxState', shortMovie);

  };
  function shortMovieCheck(e) {
    if (e.target.checked) {
      setShortMovieTrue();
    } else {
      setShortMovieFalse();
    }
  }

  useEffect(() => {
    setMovieTitle(localStorage.getItem('searchRequset'));
    if (localStorage.getItem('checkboxState') === 'true') {
      setShortMovieTrue();
      return;
    }
    if (localStorage.getItem('checkboxState') === 'false') {
      setShortMovieFalse();
    }
  }, [])

  return(
    <section className="search" aria-label="Поиск фильмов">
      <form className="movies-form">
        <span className={`movies-form__search-error ${error ? 'movies-form__search-error_visible' : ''}`}>Нужно ввести ключевое слово</span>
        <img className='movies-form__search-icon movies-form__search-icon_gray' src={searchIcon} alt='Поиск'/>
        <input className='movies-form__input' placeholder='Фильм' onChange={handleTitle} defaultValue={localStorage.getItem('searchRequset') !== '' ? localStorage.getItem('searchRequset') : ''}/>
        <button className='movies-form__submit' type='submit' onClick={searchSubmit} >
          <img className='movies-form__search-icon_white' src={searchIconWhite} alt='Поиск'/>
        </button>
      </form>
      <label className='movies-checkbox__label'>
        <input className='movies-checkbox' type='checkbox' onChange={shortMovieCheck} defaultChecked={localStorage.getItem('checkboxState') === 'true' ? true : false}/>
      </label>
      <h2 className='movies__short'>Короткометражки</h2>
    </section>
  )
}
export default SearchForm