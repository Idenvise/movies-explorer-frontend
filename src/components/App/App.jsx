import React, {userEffect} from 'react';
import { Redirect, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import './App.css';
import '../../vendor/fonts/Inter/inter.css'
import Main from '../Main/Main'
import Header from '../Header/Header';
import Footer from './Footer/Footer';

function App() {

  return (
    <div className='page'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default withRouter(App);
