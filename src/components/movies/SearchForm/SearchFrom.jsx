import './SearchForm.css'
import searchIcon from '../../../images/search-icon.svg'
import searchIconWhite from '../../../images/search-icon_white.svg'

function SearchForm() {

  return(
    <section className="search" aria-label="Поиск фильмов">
      <form className="movies-form">
        <img className='movies-form__search-icon movies-form__search-icon_gray' src={searchIcon} alt='Поиск'/>
        <input className='movies-form__input' placeholder='Фильм'/>
        <button className='movies-form__submit' type='submit'><img className='movies-form__search-icon_white' src={searchIconWhite} alt='Поиск'/></button>
      </form>
      <label className='movies-checkbox-label'>
        <input className='movies-checkbox' type='checkbox' />
      </label>
    </section>
  )
}
export default SearchForm