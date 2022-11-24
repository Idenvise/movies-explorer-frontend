import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import '../../vendor/fonts/Inter/inter.css'
import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import NavBurgerPanel from '../NavBurgerPanel/NavBurgerPanel';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Signup from '../Signup/Signup';
import Signin from '../Signin/Signin';

function App() {
  const [burgerOpen, setBurgerOpen] = React.useState(false);

  function controlBurger() {
    setBurgerOpen(!burgerOpen);
  }

  return (
    <div className='page'>
      <Switch>
        <Route exact path={['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup']}>
          <Header openBurger={controlBurger}/>
        </Route>
      </Switch>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <Movies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Switch>
        <Route exact path={['/', '/movies', '/saved-movies']}>
          <Footer />
        </Route>
      </Switch>

      <NavBurgerPanel burgerOpen={burgerOpen} closeBurger={controlBurger}/>
    </div>
  );
}

export default withRouter(App);
