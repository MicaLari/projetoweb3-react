import ButtonLoading from '../components/ButtonLoading'
import Carousel from 'react-bootstrap/Carousel'
import Header from "../components/Header"
import "./Home.css"
import MainContainer from '../components/MainContainer'
import Modal from '../components/Modal'
import Footer from "../components/Footer"
import "../components/Footer"
import useAuth from '../hooks/useAuth'
import {useEffect, useState} from 'react'
import {API_PATH} from  "../config"
import CardUser from '../components/CardUser'

const Home = () => {

  const [films, setFilms] = useState([])
  const [filmToEdit, setFilmToEdit] = useState({
    id: "",
    nome: "",
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

  useEffect(() => {
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
        <div className='produtoras'>
          <h1>Produtora:</h1><br />
          <div className='imgs'>
            <img
                className="img"
                src="assets/img/paramount.png"
                alt="paramount"
            />

            <img
              className="img"
              src="assets/img/netflix1.png"
              alt="netflix"
            />

            <img
              className="img"
              src="assets/img/starz.png"
              alt="starz"
            />

            <img
              className="img"
              src="assets/img/amazon.png"
              alt="amazon"
            />

            <img
              className="img"
              src="assets/img/hbo.png"
              alt="hbo"
            />

            <img
              className="img"
              src="assets/img/globo1.png"
              alt="globo"
            />

            <img
              className="img"
              src="assets/img/app.png"
              alt="app"
            />


          </div>
         

        </div><br/>
        

        <h1>Filmes: </h1><br />
        <div className="film">
          {
            films.length === 0
            ? <p>Nenhum usuário</p>
            : films.map((film) =>  
              (
                <CardUser setFilms={setFilms} films={films} key={film.id} imgUrl={film.img} id={film.id} nome={film.nome}/>
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
              <p>Imagem: <input type="text" name="img" value={filmToEdit.img} onChange={(event)=>handleChange(event)}/></p>
              <ButtonLoading type="submit" isLoading={isLoading}>Update</ButtonLoading>
          </form>

      </Modal>


    </>
  )
}



export default Home