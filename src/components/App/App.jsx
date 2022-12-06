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
import ProtectedAuthRoute from '../ProtectedAuthRoute/ProtectedAuthRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [burgerOpen, setBurgerOpen] = React.useState(false);
  const [showPreloader, setShowPrelodaer] = React.useState(false);
  const [notFoundVisible, setNotFoundVisible] = React.useState(false);
  const [requestError, setRequestError] = React.useState(false);
  const [shortMovie, setShortMovie] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [allowRedirect, setAllowRedirect] = React.useState(false);
  const [newMovies, setNewMovies] = React.useState([]);
  const [clearStates, setClearStates] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [savedTitle, setSavedTitle] = React.useState('');
  const hist = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      mainApi.tokenCheck(localStorage.getItem('token'))
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          setAllowRedirect(false);
          const localMovies = localStorage.getItem('localMovies')
          localMovies !== null && setNewMovies(JSON.parse(localMovies));
          mainApi.getMovies()
          .then(res => {
            setSavedMovies(res)
            setFilteredSavedMovies(res);
          })
          .catch(err => {return Promise.reject(err)})
        })
        .catch((err) => {
          setAllowRedirect(true);
          return Promise.reject(err);
        })
    } else {
      setAllowRedirect(true);
    }
  }, [])

  useEffect(() => {
    if (loggedIn === true) {
      mainApi.getMovies()
      .then(res => {
        setSavedMovies(res)
        setFilteredSavedMovies(res);
      })
      .catch(err => {return Promise.reject(err)})
    }
  }, [loggedIn])

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

  function getMovies(title) {
    setTitle(title);
    setNotFoundVisible(true);
    if (window.location.pathname === '/movies') {
    mainApi.tokenCheck()
    .then(() => {
      const localMovies = localStorage.getItem('movies')
      if (localMovies === null) {
        moviesApi.getMovies()
        .then(res => {
          setMovies(res);
          setRequestError(false);
          localStorage.setItem('movies', JSON.stringify(res))
          return res;
        })
        .catch(() => setRequestError(true));
        setShowPrelodaer(false);
      } else {
      setMovies(JSON.parse(localMovies));
      }
    })
    .catch(err => {if (err === 'Ошибка 401') {
      logOut();
    }})
    }
    if (window.location.pathname === '/saved-movies') {
      setSavedTitle(title);
    }
  }

  useEffect(() => {
    (movies.length !== 0 && movies !== null && window.location.pathname === '/movies') && setNewMovies(movies.filter(movie => movie.nameRU.toLowerCase().includes(title.toLowerCase())));
  }, [title, movies]);

  useEffect(() => {
    setFilteredSavedMovies(savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(savedTitle.toLowerCase())));
  }, [savedTitle, savedMovies])

  function logOut() {
    setClearStates(true);
    setLoggedIn(false);
    setAllowRedirect(true);
    localStorage.clear();
    hist.push('/');
  }

  useEffect(() => {
    if (clearStates === true) {
      setLoggedIn(false);
      setBurgerOpen(false);
      setShowPrelodaer(false);
      setNotFoundVisible(false);
      setRequestError('');
      setShortMovie(false);
      setCurrentUser({});
      setSavedMovies([]);
      setAllowRedirect(false);
      setNewMovies([]);
      setMovies([]);
      setClearStates(false);
      setFilteredSavedMovies([]);
      setTitle('');
      setSavedTitle('');
    }
  }, [clearStates])

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
              allowRedirect={allowRedirect}
              getMovies={getMovies}
              preloader={preloaderControl}
              preloaderState={showPreloader}
              notFoundVisible={notFoundVisible}
              requestError={requestError}
              setShortMovieTrue={setShortMovieTrue}
              setShortMovieFalse={setShortMovieFalse}
              shortMovie={shortMovie}
              setSavedMovies={setSavedMovies}
              savedMovies={savedMovies}
              newMovies={newMovies}
              logOut={logOut}
              clearStates={clearStates}
              filteredSavedMovies={filteredSavedMovies}
              setFilteredSavedMovies={setFilteredSavedMovies}
              movies={movies}
            />
          </Route>
          <Route path='/profile'>
            <ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              redirectPath='/'
              allowRedirect={allowRedirect}
              setCurrentUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
              logOut={logOut}
            />
          </Route>
          <Route path='/signin'>
            <ProtectedAuthRoute component={Signin} loggedIn={loggedIn} redirectPath='/movies' setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} clearStates={clearStates}/>
          </Route>
          <Route path='/signup'>
            <ProtectedAuthRoute component={Signup} loggedIn={loggedIn} redirectPath='/movies' setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} clearStates={clearStates}/>
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

