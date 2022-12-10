import ButtonLoading from '../components/ButtonLoading'
import CardAdmin from '../components/CardAdmin'
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

  const [films, setFilms] = useState([])
  const [filmToEdit, setFilmToEdit] = useState({
    id: "",
    name: "",
    img: "",
    genero: "",
    min: "",
  })
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [filmLogged] = useAuth()
  const {idFilm, token} = filmLogged

  const requestFilm = async () => {
    const response = await fetch(`${API_PATH}film/list`)
    const result = await response.json()
    console.log(result.success.message)
    setFilms(result.data)
  }

  const handleChange = (event) =>{
    setFilmToEdit({...filmToEdit, [event.target.nome]: event.target.value })
  }

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault()
    const response = await fetch(`${API_PATH}user/update`, {
      method: 'PUT',
      body: JSON.stringify(filmToEdit),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${idFilm} ${token}`
      }
    })
    const result = await response.json()
    if(result?.success && result?.film){
      const filmUpdated = result.films
      const filmsToUpdated = films.map((films) => {
        return films.id === filmUpdated.id ? filmUpdated : films  
      })
      setFilms(filmsToUpdated)
      setShowModal(false)
    }
    console.log(JSON.stringify(result))
    setIsLoading(false)
}

  useEffect(() => {
    requestFilm()
  },[])


  return (
    <>
      < Header />


      <MainContainer>
      
        <h1>Produtora:</h1>

        <div className="test">
          {
            films.length === 0
            ? <p>Nenhum usuário</p>
            : films.map((film) =>  
              (
                <CardAdmin setFilms={setFilms} films={films} key={films.id} imgUrl={film.img}  genero={film.genero} min={film.min}
                name={film.name} id={film.id} setShowModal={setShowModal} setFilmToEdit={setFilmToEdit}/>
              
              )
            )    
          }
        </div>
      
      </MainContainer>
    
      <Footer/>

      <Modal showModal={showModal} setShowModal={setShowModal}>
          <h1>Edit User</h1>

          <form onSubmit={(event) => handleSubmit(event)}>
              <input type="hidden" name="id" value={filmToEdit.id}/>
              <p>Name: <input type="text" name="name" value={filmToEdit.name} onChange={(event)=>handleChange(event)}/></p>
              <p>Img: <input type="text" name="img" value={filmToEdit.img} onChange={(event)=>handleChange(event)}/></p>
              <p>Gênero: <input type="text" name="genero" value={filmToEdit.genero} onChange={(event)=>handleChange(event)}/></p>
              <p>Min: <input type="numero" name="min" value={filmToEdit.min} onChange={(event)=>handleChange(event)}/></p>
              <ButtonLoading type="submit" isLoading={isLoading}>Update</ButtonLoading>
          </form>

      </Modal>


    </>
  )
}



export default HomeAdmin