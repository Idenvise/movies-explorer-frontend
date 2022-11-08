import './Footer.css'

function Footer() {

  return(
    <footer className='footer'>
      <p className='footer__about'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright'>&copy; 2022</p>
        <div className='footer__links'>
          <a className='footer__link' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/Idenvise'>Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer