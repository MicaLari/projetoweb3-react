import { Link } from 'react-router-dom'
import {TbTrash as IconTrash, TbEdit as IconEdit} from 'react-icons/tb'
import { API_PATH  } from "../config"
import useAuth from '../hooks/useAuth'
import "./CardAdmin.css"

const CardUsers = ({avatarUrl, name, children, id, users, setUsers, setShowModal, setUserToEdit}) => {

const [userLogged] = useAuth()
  const {isLogged, idUser, token, role} = userLogged

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
            const usersFiltered = users.filter((user) => {return user.id !== id})
            setUsers(usersFiltered)
        } else {
            console.error(result?.error)
        }
    }

    const handleEdit = () =>{
        setShowModal(true)
        setUserToEdit({
            id,
            name,
            email: children,
            avatar: avatarUrl,
          })
    }

  return (
    <div className="card-Admin">
        <Link to={`/user/${id}`}>
            <img className='avatarAdmin' src={avatarUrl} alt={name}/>
        </Link>
        <div className="box-admin">
            <Link to={`/user/${id}`}>
                <h1 className="userNameAdmin">{name}</h1>
                <p className="textAdmin">{children}</p>
            </Link>
            {
               isLogged && role.includes('admin') ?
               <>
                <IconTrash className="buttonLink" onClick={() => deleteUser(id)} />
               </>
               : ''
            }
            {
               isLogged && id === idUser ?
               <>
                <IconEdit className="buttonLink" onClick={() => handleEdit()} />
               </>
               : ''
            }
        </div>
    </div>
  )
}


export default CardUsers