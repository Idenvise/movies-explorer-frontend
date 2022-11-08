import './Portfolio.css'
import arrow from '../../../images/portfolio__arrow.svg'

function Portfolio() {

  return(
    <section className="portfolio">
    <h2 className='portfolio__portfolio-subheading'>Портфолио</h2>
      <ul className='portfolio__portfolio_list'>
        <li className='portfolio__portfolio'>
          Статичный сайт
          <a className='portfolio__portfolio__arrow' href='https://idenvise.github.io/how-to-learn/'>
            <img className='portfolio__portfolio__arrow-image' src={arrow} alt='Ссылка' />
          </a>
        </li>
        <li className='portfolio__portfolio'>
          Адаптивный сайт
          <a className='portfolio__portfolio__arrow' href='https://idenvise.github.io/russian-travel/'>
            <img className='portfolio__portfolio__arrow-image' src={arrow} alt='Ссылка' />
          </a>
        </li>
        <li className='portfolio__portfolio'>
          Одностраничное приложение
          <a className='portfolio__portfolio__arrow' href='https://github.com/Idenvise/react-mesto-auth'>
            <img className='portfolio__portfolio__arrow-image' src={arrow} alt='Ссылка' />
          </a>
        </li>
      </ul>
  </section>
  )
}
export default Portfolio