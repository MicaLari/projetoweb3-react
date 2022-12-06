import ButtonLoading from '../components/ButtonLoading'
import CardUser from '../components/CardAdmin'
import Header from "../components/Header"
import "./Home.css"
import MainContainer from '../components/MainContainer'
import Modal from '../components/Modal'
import Footer from "../components/Footer"
import "../components/Footer"
import useAuth from '../hooks/useAuth'
import {useEffect, useState} from 'react'
import {API_PATH} from  "../config"

const HomeAdmin = () => {

  const [film, setFilm] = useState([])
  const [userToEdit, setUserToEdit] = useState({
    id: "",
    name: "",
    img: "",
    genero: "",
    min: "",
  })
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [filmLogged] = useAuth()
  const {idUser, token} = filmLogged

  const requestUsers = async () => {
    const response = await fetch(`${API_PATH}user/list`)
    const result = await response.json()
    console.log(result.success.message)
    setUsers(result.data)
  }

  const handleChange = (event) =>{
    setUserToEdit({...userToEdit, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault()
    const response = await fetch(`${API_PATH}user/update`, {
      method: 'PUT',
      body: JSON.stringify(userToEdit),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${idUser} ${token}`
      }
    })
    const result = await response.json()
    if(result?.success && result?.user){
      const userUpdated = result.user
      const usersUpdated = users.map((user) => {
        return user.id === userUpdated.id ? userUpdated : user  
      })
      setUsers(usersUpdated)
      setShowModal(false)
    }
    console.log(JSON.stringify(result))
    setIsLoading(false)
}

  useEffect(() => {
    requestUsers()
  },[])


  return (
    <>
      < Header />


      <MainContainer>
      
        <h1>Produtora:</h1>

        <div className="test">
          {
            users.length === 0
            ? <p>Nenhum usuário</p>
            : users.map((user) =>  
              (
                <CardUser setFilm={setFilm} film={film} key={user.id} imgUrl={user.img} 
                name={user.name} id={user.id} setShowModal={setShowModal} setUserToEdit={setUserToEdit}/>
              
              )
            )
          }
        </div>
      
      </MainContainer>
    
      <Footer/>

      <Modal showModal={showModal} setShowModal={setShowModal}>
          <h1>Edit User</h1>

          <form onSubmit={(event) => handleSubmit(event)}>
              <input type="hidden" name="id" value={userToEdit.id}/>
              <p>Name: <input type="text" name="name" value={userToEdit.name} onChange={(event)=>handleChange(event)}/></p>
              <p>Email: <input type="text" name="email" value={userToEdit.email} onChange={(event)=>handleChange(event)}/></p>
              <p>Avatar: <input type="text" name="avatar" value={userToEdit.avatar} onChange={(event)=>handleChange(event)}/></p>
              <ButtonLoading type="submit" isLoading={isLoading}>Update</ButtonLoading>
          </form>

      </Modal>


    </>
  )
}



export default HomeAdmin