import { Link } from 'react-router-dom'
import {TbTrash as IconTrash, TbEdit as IconEdit} from 'react-icons/tb'
import { API_PATH  } from "../config"
import useAuth from '../hooks/useAuth'
import "./CardUser.css"

const CardFilms = ({imgUrl, name, genero, id, film, setFilm, setShowModal, setUserToEdit}) => {

const [filmLogged] = useAuth()
  const {isLogged, idUser, token, role} = filmLogged

    const deleteUser = async (id) => {
        //const formData = new FormData()
        //formData.append('id', id)
        const response = await fetch(`${API_PATH}user/delete`,{
            method: 'DELETE',
            body: JSON.stringify({id: id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${idUser} ${token}`
            }
        })
        const result = await response.json()
        if(result?.success){
            const filmFiltered = film.filter((user) => {return user.id !== id})
            setUsers(usersFiltered)
        } else {
            console.error(result?.error)
        }
    }

    const handleEdit = () =>{
        setShowModal(true)
        setUserToEdit({
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
            <img className='imgAdmin' src={imgUrl} alt={name}/>
        </Link>
        <div className="box-admin">
            <Link to={`/user/${id}`}>
                <h1 className="imgNameAdmin">{name}</h1>
                <p className="textAdmin">{children}</p>
                <p className="textAdmin">{children}</p>
                <p className="textAdmin">{children}</p>
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


export default CardUsers