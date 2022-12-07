import './Header.css'
import {GiFilmSpool as Film} from 'react-icons/gi'
import { BsStar as Estrela} from "react-icons/bs";
import {NavLink,Link, filmNavigate } from 'react-router-dom'
import ButtonLoading from './ButtonLoading'
import filmAuth from '../hooks/filmAuth'
import logout from '../helpers/logout'

const HeaderAdmin = () => {

  const [filmLogged, setFilmLogged] = filmAuth()
  const navigate = filmNavigate()

  const handleLogout = async () => {
    const result = await logout(filmLogged.idfilm, filmLogged.token)
    console.log(result)
    if(result?.success) {
      localStorage.removeItem('user-auth')
      setFilmLogged({
        isLogged: false,
        idFilm: '',
        token: '',
        role: '',
    })
      navigate('/')
    }
  }

  return (
    <header className='Header'>
      <div className='container'>
        <Link to='/admin'>
          <div className='logotype'>
            <Film className='icon-logo'/>
            <h1>Área Admninistrativa</h1>
          </div>
        </Link>

        <nav>
            <ul>
              <li><NavLink to='/filmes' end>Filmes</NavLink></li>
              <li><NavLink to='/series' end>Series</NavLink></li>
              <li><Estrela className='icon-type'/>   <NavLink to='/lancamentos' end>Lançamentos</NavLink> </li>
              <li><ButtonLoading onClick={()=>{handleLogout()}} isLoading={false}>Sair</ButtonLoading></li>
            </ul>
        </nav>
      </div>
    </header>
  )
}

export default HeaderAdmin