import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'
import isEmail from 'validator/lib/isEmail';
import { mainApi } from '../../utils/MainApi';
import { regExpName } from '../../utils/consts';

function Signup(props) {
  const {setLoggedIn, setCurrentUser} = props;
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const hist = useHistory();

  function checkName(e) {
    const name = e.target.value;
    if (!regExpName.test(name)) {
      setNameError(false);
      setName(name)
    } else {
      setNameError(true);
      setName('');
    }
  }

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

  function onSubmit(e) {
    e.preventDefault();
    mainApi.register(name, email, password)
      .then(() => {
        mainApi.login(email, password)
          .then((res) => {
            setSubmitError('');
            localStorage.setItem('token', res.token);
            setCurrentUser(res.user);
            setLoggedIn(true);
            hist.push('/movies');
          })
          .catch(err => {
            return Promise.reject(err);
          })
      })
      .catch(err => {
        setSubmitError(err);
        return Promise.reject(err);
      })
  }


  return (
    <section className='signup' aria-label='Регистрация'>
      <h3 className='signup__greeting'>Добро пожаловать!</h3>
      <form className='signup__wrapper' name='register-form'>
        <p className='signup__form-name'>Имя</p>
        <input className='signup__name input' placeholder='Виталий' onChange={checkName}></input>
        <span className={`signup__name-error error ${nameError ? 'error_visible' : ''}`}>Поле "Имя" может содержать только латиницу, кириллицу, пробел или дефис</span>
        <p className='signup__form-name'>E-mail</p>
        <input className='signup__email input' type='email' placeholder='pochta@yandex.ru' onChange={checkEmail}/>
        <span className={`signup__email-error error ${emailError ? 'error_visible' : ''}`}>Введите валидный email</span>
        <p className='signup__form-name'>Пароль</p>
        <input className='signup__password input' placeholder='qwerty' type='password' onChange={checkPassword}/>
        <span className={`signup__password-error error ${passwordError ? 'error_visible' : ''}`}>Длина пароля должна быть не менее 8 символов</span>
        <span className={`signup__submit-error error ${submitError !== '' ? 'error_visible' : ''}`}>{submitError}</span>
        <button className='signup__submit' disabled={nameError === false && emailError === false && passwordError === false && name !== '' && email !== '' && password !== '' ? false : true} type='submit' onClick={onSubmit}>Зарегистрироваться</button>
      </form>
      <p className='signup__already-regitered'>
        Уже зарегистрированы?
        <Link className='sigup__to-signin' to='/signin'>Войти</Link>
      </p>

    </section>
  )
}
export default Signup