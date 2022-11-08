import './Promo.css'
import planet from '../../../images/promo__planet.svg'

function Promo() {

    return(
        <section className="promo">
          <div className='promo__about'>
            <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
            <p className='promo__info'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className='promo__more'>Узнать больше</button>
          </div>
          <img className='promo__image' src={planet} alt='Планета веба' />
        </section>
    )
}

export default Promo