import '../Main.css'
import './AboutProject.css'

function AboutProject() {

  return(
    <section className="about-project">
      <h2 className='about-project__heading about__heading'>О проекте</h2>
      <div className='about-project__container'>
        <p className='about-project__subtitle box-1'>Дипломный проект включал 5 этапов</p>
        <p className='about-project__subtitle box-3'>На выполнение диплома ушло 5 недель</p>
        <p className='about-project__description box-2'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='about-project__description box-4'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about-project__time-container'>
        <p className='about-project__time_backend'>1 неделя</p>
        <p className='about-project__time_frontend'>4 недели</p>
        <p className='about-project__type'>Back-end</p>
        <p className='about-project__type'>Front-end</p>
      </div>
    </section>
  )
}
export default AboutProject