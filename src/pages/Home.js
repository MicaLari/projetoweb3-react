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
        <br />

        <h1> Sobre o Site </h1>
        <p>It is a long established fact that a reader will be distracted by the readable 
          content of a page when looking at its layout.
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution 
          of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p>

      </MainContainer>


    </>
  )
}



export default Home