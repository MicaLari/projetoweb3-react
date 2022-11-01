import './Header.css'
import {GiFilmSpool as Film} from 'react-icons/gi'
import { NavLink, Link } from 'react-router-dom'
import { BsStar as Estrela, BsSearch as Busca, BsSliders as Filtro } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Header = () => {
  return (
    <div className='Header'>
        <div className='container'>
          <Link to='/'>
            <div className='logotype'>
              <Film className='icon-logo'/>
              <h1>FreeMovies</h1>
            </div>
          </Link>
          <nav>
            <ul>
              <li><NavLink to='/filmes' end>Filmes</NavLink></li>
              <li><NavLink to='/series' end>Series</NavLink></li>
              <li><Estrela className='icon-type'/>   <NavLink to='/lancamentos' end>Lançamentos</NavLink> </li>
            </ul>
          </nav>
          <div className="test">
            <Form className="search">
              <Form.Control
                type="search"
                placeholder="Search in Films"
                className="me-2"
                aria-label="Search"
              />
              <Busca className='icon-search' />
            </Form>
          </div>
      
          <div className='Icon'>
            <Button variant="outline-light" className='Button'> <Filtro className='icon-filter' /> </Button>{' '}
       
          </div>

          <nav>
            <ul>
              <li><NavLink to='/Login' end>Login</NavLink></li>
              <li><NavLink to='/Cadastro' end>Cadastro</NavLink></li>
            </ul>
          </nav>
        </div>
    </div>
    
  )
}



export default Header