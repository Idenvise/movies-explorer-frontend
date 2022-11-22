import { Link } from 'react-router-dom';
import './NavBurgerPanel.css';
import userImage from '../../images/default_user_image.svg';

function NavBurgerPanel(props) {

  return(
    <section className={`nav-panel ${props.burgerOpen ? 'nav-panel_visible' : ''}`}>
      <div className='panel'>
        <button className='panel__close' type='button' onClick={props.closeBurger}/>
        <Link className='panel__main panel__font' to='/' onClick={props.closeBurger}>Главная</Link>
        <Link className='panel__movies panel__font' to='/movies' onClick={props.closeBurger}>Фильмы</Link>
        <Link className='panel__saved-movies panel__font' to='/saved-movies' onClick={props.closeBurger}>Сохранённые фильмы</Link>
        <Link className='panel__account nav' to='/account' onClick={props.closeBurger}>Аккаунт<img className='panel__account__image' src={userImage} alt='Значёк профия' /></Link>
      </div>
    </section>
  )
}
export default NavBurgerPanel