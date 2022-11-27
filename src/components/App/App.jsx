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
import { moviesApi } from '../../utils/MoviesApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [showPreloader, setShowPrelodaer] = React.useState(false);
  const [notFoundVisible, setNotFoundVisible] = React.useState(false);
  const [requestError, setRequestError] = React.useState('');
  const [shortMovie, setShortMovie] = React.useState(false);

  function controlBurger() {
    setBurgerOpen(!burgerOpen);
  }

  function preloaderControl() {
    setShowPrelodaer(!showPreloader)
  }

  function setShortMovieTrue() {
    setShortMovie(true);
  }

  function setShortMovieFalse() {
    setShortMovie(false);
  }

  async function getMovies(title) {
    const movies = await moviesApi.getMovies()
      .then(res => {
        setRequestError(false);
        return res;
      })
      .catch(() => setRequestError(true));
    setShowPrelodaer(false);
    setNotFoundVisible(true)
    const requestedFilms = movies.filter(movie => movie.nameRU.toLowerCase().includes(title));
    setMovies(requestedFilms);
    console.log(requestedFilms)
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
          <Movies
            getMovies={getMovies}
            movies={movies}
            preloader={preloaderControl}
            preloaderState={showPreloader}
            notFoundVisibility={notFoundVisible}
            requestError={requestError}
            setShortMovieTrue={setShortMovieTrue}
            setShortMovieFalse={setShortMovieFalse}
            shortMovie={shortMovie}
          />
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
          <Signup setLoggedIn={setLoggedIn}/>
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
