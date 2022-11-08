import { Route, Switch, Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Header.css'

function Header() {

    return(
        <header className='header'>
            <img className='header__logo' src={logo} alt='Логотип' />
            <nav className='header__nav'>
            <Switch>
                <Route path='/'>
                    <Link className='header__signup' to='/signup'>Регистрация</Link>
                    <div className='header__signin-wrapper'>
                      <Link className='header__signin' to='/signin'>Войти</Link>
                    </div>
                </Route>
            </Switch>
            </nav>
        </header>
    )
}

export default Header