import Header from "../components/Header"
import "./Home.css"
import MainContainer from '../components/MainContainer'
import Carousel from 'react-bootstrap/Carousel';


const Home = () => {

  return (
    <>
      <Header />


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

        <h1 className="test"> Sobre o Site </h1>
        <p>Lista usuários API Git Hub:</p>

      </MainContainer>


    </>
  )
}



export default Home