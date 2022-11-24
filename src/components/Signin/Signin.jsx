import { Link } from 'react-router-dom'
import './Signin.css'

function Signin() {
  return(
    <section className='signin' aria-label='Авторизация'>
      <h3 className='signin__greeting'>Рады видеть!</h3>
      <form className='signin__form' name='signin-form'>
        <p className='signin__form-name'>E-mail</p>
        <input className='signin__name input' type='email' />
        <p className='signin__form-name'>Пароль</p>
        <input className='signin__password input' type='password' />
        <button className='signin__submit' type='submit'>Войти</button>
      </form>
      <p className='signin__notreg'>
        Ещё не зарегистрированы?
        <Link className='signin__to-signup' to='/signup'>Регистрация</Link>
      </p>
    </section>
  )
}
export default Signin