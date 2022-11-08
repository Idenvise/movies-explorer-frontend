import '../Main.css'
import './Techs.css'

function Techs() {

  return(
    <section className='techs'>
      <h2 className='techs__heading about__heading'>Технологии</h2>
      <div className='techs__container'>
        <p className='techs__technologies'>7 технологий</p>
        <p className='techs__about'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className='techs__list'>
        <li className='techs__tech'>HTML</li>
        <li className='techs__tech'>CSS</li>
        <li className='techs__tech'>JS</li>
        <li className='techs__tech'>React</li>
        <li className='techs__tech'>Git</li>
        <li className='techs__tech'>Express.js</li>
        <li className='techs__tech'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs