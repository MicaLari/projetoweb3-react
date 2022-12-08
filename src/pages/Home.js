import ButtonLoading from '../components/ButtonLoading'
import cardUser from '../components/cardUser'
import Carousel from 'react-bootstrap/Carousel'
import Header from "../components/Header"
import "./Home.css"
import MainContainer from '../components/MainContainer'
import Modal from '../components/Modal'
import Footer from "../components/Footer"
import "../components/Footer"
import filmAuth from '../hooks/filmAuth'
import {filmEffect, filmState} from 'react'
import {API_PATH} from  "../config"

const Home = () => {

  const [films, setFilms] = filmState([])
  const [filmToEdit, setFilmToEdit] = filmState({
    id: "",
    nome: "",
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
    setFilms(result.data)
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
      const filmsUpdated = films.map((films) => {
        return films.id === filmUpdated.id ? filmsUpdated : films  
      })
      setFilms(filmsUpdated)
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
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/filme1.jpeg"
              alt="Minios"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/filme2.jpeg"
              alt="Thor: Amor e trovão"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="assets/img/filme3.jpg"
              alt="sla"
            />
          </Carousel.Item>

        </Carousel>
        <br />
 
        <h1> Sobre o Site </h1>
        <p>It is a long established fact that a reader will be distracted by the readable 
          content of a page when looking at its layout.
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
          of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p> <br />

        <h1>Produtora:</h1>

        <div className="test">
          {
            films.length === 0
            ? <p>Nenhum usuário</p>
            : films.map((film) =>  
              (
                <cardUser setFilms={setFilms} films={films} key={films.id} ImgUrl={film.img} >
                </cardUser>
              )
            )
          }
        </div>
      
      </MainContainer>
    
      <Footer/>

      <Modal showModal={showModal} setShowModal={setShowModal}>
          <h1>Edit Films</h1>

          <form onSubmit={(event) => handleSubmit(event)}>
              <input type="hidden" name="id" value={filmToEdit.id}/>
              <p>Imagem: <input type="text" name="img" value={filmToEdit.avatar} onChange={(event)=>handleChange(event)}/></p>
              <ButtonLoading type="submit" isLoading={isLoading}>Update</ButtonLoading>
          </form>

      </Modal>


    </>
  )
}



export default Home