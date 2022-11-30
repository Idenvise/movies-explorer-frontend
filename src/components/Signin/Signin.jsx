import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signin.css'
import isEmail from 'validator/lib/isEmail';
import { mainApi } from '../../utils/MainApi';

function Signin(props) {
  const {setLoggedIn, setCurrentUser} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const hist = useHistory();

  function checkEmail(e) {
    const email = e.target.value;
    if (isEmail(email)) {
      setEmailError(false);
      setEmail(email);
    } else {
      setEmailError(true);
      setEmail('');
    }
  }

  function checkPassword(e) {
    const password = e.target.value;
    if (password.length > 7) {
      setPasswordError(false)
      setPassword(password)
    } else {
      setPasswordError(true);
      setPassword('');
    }
  }

  function onLogin(e) {
    e.preventDefault();
    mainApi.login(email, password)
      .then((res) => {
        setSubmitError('');
        localStorage.setItem('token', res.token)
        setCurrentUser(res.user);
        setLoggedIn(true);
        hist.push('/movies');
      })
      .catch(err => {
        setSubmitError(err);
        return Promise.reject(err);
      })
  }
  return(
    <section className='signin' aria-label='Авторизация'>
      <h3 className='signin__greeting'>Рады видеть!</h3>
      <form className='signin__form' name='signin-form'>
        <p className='signin__form-name'>E-mail</p>
        <input className='signin__email input' type='email' onChange={checkEmail}/>
        <span className={`signin__email-error error ${emailError ? 'error_visible' : ''}`}>Введите валидный email</span>
        <p className='signin__form-name'>Пароль</p>
        <input className='signin__password input' type='password' onChange={checkPassword}/>
        <span className={`signin__password-error error ${passwordError ? 'error_visible' : ''}`}>Длина пароля не менее 8 символов</span>
        <span className={`signin__submit-error error ${submitError !== '' ? 'error_visible' : ''}`}>{submitError}</span>
        <button className='signin__submit' type='submit' disabled={emailError === false && passwordError === false && email !== '' && password !== '' ? false : true} onClick={onLogin}>Войти</button>
      </form>
      <p className='signin__notreg'>
        Ещё не зарегистрированы?
        <Link className='signin__to-signup' to='/signup'>Регистрация</Link>
      </p>
    </section>
  )
}
export default Signin