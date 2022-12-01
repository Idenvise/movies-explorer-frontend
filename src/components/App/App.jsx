import React from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
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
import { CurrentUserContext } from '../../context/currentUserContext';
import { useEffect } from 'react';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const hist = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [showPreloader, setShowPrelodaer] = React.useState(false);
  const [notFoundVisible, setNotFoundVisible] = React.useState(false);
  const [requestError, setRequestError] = React.useState('');
  const [shortMovie, setShortMovie] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      mainApi.tokenCheck(localStorage.getItem('token'))
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          hist.push('/movies');
          mainApi.getMovies()
            .then(res => setSavedMovies(res))
            .catch((err) => {return Promise.reject(err)})
        })
        .catch((err) => {return Promise.reject(err)})
    }
  }, [])

  useEffect(() => {
    mainApi.updateToken();
  }, [loggedIn]);


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
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path={['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup']}>
            <Header openBurger={controlBurger} loggedIn={loggedIn}/>
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path={['/movies', '/saved-movies']}>
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              redirectPath='/'
              getMovies={getMovies}
              movies={movies}
              preloader={preloaderControl}
              preloaderState={showPreloader}
              notFoundVisibility={notFoundVisible}
              requestError={requestError}
              setShortMovieTrue={setShortMovieTrue}
              setShortMovieFalse={setShortMovieFalse}
              shortMovie={shortMovie}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
            />
          </Route>
          <Route path='/profile'>
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              redirectPath='/'
              setCurrentUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path='/signin'>
            <Signin setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path='/signup'>
            <Signup setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser}/>
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
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
