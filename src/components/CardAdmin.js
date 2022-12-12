import { Link } from 'react-router-dom'
import {TbTrash as IconTrash, TbEdit as IconEdit} from 'react-icons/tb'
import { API_PATH  } from "../config"
import useAuth from '../hooks/useAuth'
import "./CardAdmin.css"

const CardAdmin = ({imgUrl, nome, genero, id, min ,films, setFilms, setShowModal, setFilmToEdit}) => {

const [filmLogged] = useAuth()
  const { idFilm, token } = filmLogged

    const deleteUser = async (id) => {
        //const formData = new FormData()
        //formData.append('id', id)
        const response = await fetch(`${API_PATH}film/delete`,{
            method: 'DELETE',
            body: JSON.stringify({id: id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${idFilm} ${token}`
            }
        })
        const result = await response.json()
        if(result?.success){
            const filmFiltered = films.filter((films) => {return films.id !== id})
            setFilms(filmFiltered)
        } else {
            console.error(result?.error)
        }
    }

    const handleEdit = () =>{
        setShowModal(true)
        setFilmToEdit({
            id,
            nome,
            img: imgUrl,
            genero,
            min,

          })
    }

  return (
    <div className="card-Admin">
        <Link to={`/user/${id}`}>
            <img className='imgAdmin' src={imgUrl} alt={nome}/>
        </Link>
        <div className="box-admin">
            <Link to={`/user/${id}`}>
                <p className="imgNameAdmin">{nome}</p>
                <p className="textAdmin">{genero}</p>
                <p className="textAdmin">{min}</p>
            </Link>
            {
            //    isLogged && role.includes('admin') ?
               <>
                <IconTrash className="buttonLink" onClick={() => deleteUser(id)} />
               </>
            //    : ''
            }
            {
            //    isLogged && id === idUser ?
               <>
                <IconEdit className="buttonLink" onClick={() => handleEdit()} />
               </>
            //    : ''
            }
        </div>
    </div>
  )
}


export default CardAdmin