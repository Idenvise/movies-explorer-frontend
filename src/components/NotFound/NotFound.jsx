import { useHistory } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const hist = useHistory();
  function pushBack() {
    hist.length > 1 ? hist.goBack() : hist.push('/');
  }
  return(
    <section className='notfound'>
      <h2 className='notfound__code'>404</h2>
      <p className='notfound__text'>Страница не найдена</p>
      <button className='notfound__goback' type='button' onClick={pushBack} >Назад</button>
    </section>
  )
}
export default NotFound