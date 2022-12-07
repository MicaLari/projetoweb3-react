import ButtonLoading from '../components/ButtonLoading'
import CardUser from '../components/CardAdmin'
import Header from "../components/Header"
import "./Home.css"
import MainContainer from '../components/MainContainer'
import Modal from '../components/Modal'
import Footer from "../components/Footer"
import "../components/Footer"
import filmAuth from '../hooks/filmAuth'
import {filmEffect, filmState} from 'react'
import {API_PATH} from  "../config"

const HomeAdmin = () => {

  const [film, setFilm] = filmState([])
  const [filmToEdit, setFilmToEdit] = filmState({
    id: "",
    name: "",
    img: "",
    genero: "",
    min: "",
  })
  const [showModal, setShowModal] = filmState(false)
  const [isLoading, setIsLoading] = filmState(false)

  const [filmLogged] = filmAuth()
  const {idFilm, token} = filmLogged

  const requestFilm = async () => {
    const response = await fetch(`${API_PATH}user/list`)
    const result = await response.json()
    console.log(result.success.message)
    setFilm(result.data)
  }

  const handleChange = (event) =>{
    setFilmToEdit({...filmToEdit, [event.target.name]: event.target.value })
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
      const filmUpdated = result.film
      const filmUpdated = film.map((film) => {
        return film.id === filmUpdated.id ? filmUpdated : film  
      })
      setFilm(filmUpdated)
      setShowModal(false)
    }
    console.log(JSON.stringify(result))
    setIsLoading(false)
}

  filmEffect(() => {
    requestFilm()
  },[])


  return (
    <>
      < Header />


      <MainContainer>
      
        <h1>Produtora:</h1>

        <div className="test">
          {
            film.length === 0
            ? <p>Nenhum usuário</p>
            : film.map((film) =>  
              (
                <CardUser setFilm={setFilm} film={film} key={film.id} imgUrl={film.img}  genero={film.genero} min={film.min}
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
              <p>Min: <input type="text" name="min" value={filmToEdit.min} onChange={(event)=>handleChange(event)}/></p>
              <ButtonLoading type="submit" isLoading={isLoading}>Update</ButtonLoading>
          </form>

      </Modal>


    </>
  )
}



export default HomeAdmin