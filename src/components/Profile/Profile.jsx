import './Profile.css'

function Profile() {

  return(
    <section className='profile' aria-label='Профиль'>
      <h2 className='profile__greeting'>Привет, Виталий!</h2>
        <div className='profile__name-wrapper'>
          <p className='profile__name profile__data__font' >Имя</p>
          <p className='profile__username profile__data__font'>Виталий</p>
        </div>
        <div className='profile__email-wrapper'>
          <p className='profile__email profile__data__font'>E-mail</p>
          <p className='profile__useremail profile__data__font'>pochta@yandex.ru</p>
        </div>
        <button className='profile__user-info-edit profile__button' type='button'>Редактировать</button>
        <button className='profile__exit profile__button' type='button'>Выйти из аккаунта</button>
    </section>
  )
}
export default Profile