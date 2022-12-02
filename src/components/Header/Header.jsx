import React from 'react';
import { useEffect } from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import userImage from '../../images/default_user_image.svg';
import './Header.css'


function Header(props) {
  const {openBurger, loggedIn} = props;
  const [whiteHeader, setWhiteHeader] = React.useState(false);
  const [authPage, setAuthPage] = React.useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setWhiteHeader(false);
    } else {
      setWhiteHeader(true);
    }
    if (location.pathname === '/signin' || location.pathname === '/signup') {
      setAuthPage(true);
    } else {
      setAuthPage(false);
    }
  }, [location.pathname])


  return(
      <header className={`header ${whiteHeader ? 'header_white' : ''} ${authPage ? 'header__auth' : ''}`}>
          <Link to='/'><img className='header__logo' src={logo} to='/' alt='Логотип' /></Link>
          <nav className='header__wrapper'>
          <Route exact path={['/movies', '/saved-movies', '/profile', '/']}>
            {loggedIn === false ? (
              <nav className='header__nav'>
                <Link className='header__signup' to='/signup'>Регистрация</Link>
                <div className='header__signin-wrapper'>
                  <Link className='header__signin' to='/signin'>Войти</Link>
                </div>
              </nav>
            ) : (
              <nav className='header__nav'>
                <Link className='header__films nav' to='/movies'>Фильмы</Link>
                <Link className='header__saved-films nav' to='/saved-movies'>Сохранённые фильмы</Link>
                <Link className='header__account nav' to='/profile'>Аккаунт<img className='header__account__image' src={userImage} alt='Значёк профия' /></Link>
                <button className='header__burger nav' type='button' onClick={openBurger}/>
              </nav>
            )}
          </Route>
          </nav>
      </header>
  )
}

export default Header