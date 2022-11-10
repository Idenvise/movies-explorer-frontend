import React from 'react';
import { useEffect } from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import userImage from '../../images/default_user_image.svg';
import './Header.css'


function Header() {
  const [whiteHeader, setWhiteHeader] = React.useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setWhiteHeader(false);
    } else {
      setWhiteHeader(true);
    }
  }, [location.pathname])

  return(
      <header className={`header ${whiteHeader ? 'header_white' : ''}`}>
          <Link to='/'><img className='header__logo' src={logo} to='/' alt='Логотип' /></Link>
          <nav className='header__nav'>
          <Switch>
            <Route exact path='/'>
              <Link className='header__signup' to='/signup'>Регистрация</Link>
              <div className='header__signin-wrapper'>
                <Link className='header__signin' to='/signin'>Войти</Link>
              </div>
            </Route>
            <Route path='/movies'>
              <Link className='header__films'>Фильмы</Link>
              <Link className='header__saved-films'>Сохранённые Фильмы</Link>
              <Link className='header__account'>Аккаунт<img className='header__account__image' src={userImage} alt='Значёк профия' /></Link>
            </Route>

          </Switch>
          </nav>
      </header>
  )
}

export default Header