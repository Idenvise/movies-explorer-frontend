import { Link } from 'react-router-dom'
import './Signup.css'

function Signup() {
  return (
    <section className='signup' aria-label='Регистрация'>
      <h3 className='signup__greeting'>Добро пожаловать!</h3>
      <form className='signup__wrapper' name='register-form'>
        <p className='signup__form-name'>Имя</p>
        <input className='signup__name input' placeholder='Виталий'></input>
        <p className='signup__form-name'>E-mail</p>
        <input className='signup__email input' type='email' placeholder='pochta@yandex.ru'/>
        <p className='signup__form-name'>Пароль</p>
        <input className='signup__password input' placeholder='qwerty' type='password' />
        <span className='signup__password-error'>Что-то пошло не так...</span>
        <button className='signup__submit' type='submit'>Зарегистрироваться</button>
      </form>
      <p className='signup__already-regitered'>
        Уже зарегистрированы?
        <Link className='sigup__to-signin' to='/signin'>Войти</Link>
      </p>

    </section>
  )
}
export default Signup