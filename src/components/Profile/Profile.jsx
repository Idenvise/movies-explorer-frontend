import './Profile.css'
import React from 'react';
import { CurrentUserContext } from '../../context/currentUserContext';
import isEmail from 'validator/lib/isEmail';
import { regExpName } from '../../utils/consts';
import { mainApi } from '../../utils/MainApi';
import { useHistory } from 'react-router-dom';

function Profile(props) {
  const { setCurrentUser, setLoggedIn } = props;
  const hist = useHistory();
  const {name, email, _id} = React.useContext(CurrentUserContext);
  const [newName, setNewName] = React.useState(name);
  const [newEmail, setNewEmail] = React.useState(email);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [submitInfo, setSubmitInfo] = React.useState('');

  function checkName(e) {
    setNewName(e.target.value)
    if (!regExpName.test(e.target.value)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  }

  function checkEmail(e) {
    setNewEmail(e.target.value);
    if (isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  function patchUser(e) {
    e.preventDefault();
    mainApi.patchUser(newName, newEmail)
      .then(res => {
        setCurrentUser(res);
        setSubmitInfo('Данные успешно изменены')
      })
      .catch(err => {return Promise.reject(err)})
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return(
    <section className='profile' aria-label='Профиль'>
      <form className='profile__form' name='profile-form'>
      <h2 className='profile__greeting'>{`Привет, ${name}!`}</h2>
        <div className='profile__name-wrapper'>
          <p className='profile__name profile__data__font' >Имя</p>
          <input className='profile__username profile__input profile__data__font' defaultValue={name} onChange={checkName}></input>
          <span className={`signup__name-error profile__error ${nameError ? 'visible' : ''}`}>Разрешены только буквы, пробелы или дефисы</span>
        </div>
        <div className='profile__email-wrapper'>
          <p className='profile__email profile__data__font'>E-mail</p>
          <span className={`signup__email-error profile__error ${emailError ? 'visible' : ''}`}>Введите валидный email</span>
          <input type='email' className='profile__useremail profile__input profile__data__font' defaultValue={email} onChange={checkEmail}></input>
        </div>
        <span className={`profile__submit-info ${submitInfo !== '' ? 'visible' : ''}`} >{submitInfo}</span>
        <button className='profile__user-info-edit profile__button' type='submit' onClick={patchUser} disabled={(newName !== name || newEmail !== email) && emailError === false && nameError === false && newEmail !== '' &&  newEmail !== '' ? false : true}>Редактировать</button>
        <button className='profile__exit profile__button' type='button' onClick={signOut}>Выйти из аккаунта</button>
      </form>
    </section>
  )
}
export default Profile