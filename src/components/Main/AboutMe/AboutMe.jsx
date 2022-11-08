import './AboutMe.css'
import '../Main.css'
import photo from '../../../images/about-me__photo.jpg'


function AboutMe() {

  return(
    <section className='about-me'>
      <h2 className='about-me__heading about__heading'>Студент</h2>
      <div className='about-me__information'>
        <div className='about-me__wrapper'>
          <p className='about-me__name'>Павел</p>
          <p className='about-me__course-name'>Фронтенд-разрабочик, 23 года</p>
          <article className='about-me__description'>
              Я родился и живу в Новосибирске, закончил факультет бинез-информатики в СГУПС.
              Начал изучать Фронтенд разработку в 2021 году.
              На данный момент работаю в компании
              «Таврида Электрик».
          </article>
          <a className='about-me__github' href='https://github.com/Idenvise'>Github</a>
        </div>
        <img className='about-me__photo' src={photo} alt='Моё фото'/>
      </div>
    </section>
  )
}
export default AboutMe