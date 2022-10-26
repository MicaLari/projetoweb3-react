import './Header.css'
import {GiFilmSpool as Film} from 'react-icons/gi'
import { NavLink, Link } from 'react-router-dom'
import { BsStar as Estrela } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';
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
          <Form className="search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </div>
    </div>
    
  )
}



export default Header