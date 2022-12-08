import { useState } from "react"
import { Link } from "react-router-dom"
import { API_PATH } from "../config"
import ButtonLoading from "../components/ButtonLoading"
import Alert from "../components/Alert"
import Header from "../components/Header"
import Footer from "../components/Footer"
import './Cadastro.css'

const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({hasError: false,
  message: "Erro no servidor! Por favor, tente novamente!"})
  const [success, setSuccess] = useState(false)

  const createUser = async (user) => {
    const response = await fetch(`${API_PATH}user/user`, {
      method: 'POST',
      body: JSON.stringify(user)
    })
    const result = await response.json()
    if (result?.success) {
      setSuccess(true)
    } else if(result?.error){
      if(result?.error?.message){
        setError({
          hasError: true,
          message: result.error.message 
        })
      } else{
        setError({...error, hasError: true})
      }
    }
    setIsLoading(false)
  }

  const handleSubmit = (event) => {
    setIsLoading(true)
    setSuccess(false)
    setError({
      hasError: false,
      message: "Erro no servidor! Por favor, tente novamente!"
    })
    event.preventDefault()
    const { name, img, genero, min } = event.target
    createUser({
      name: name.value,
      img: img.value,
      genero: genero.value,
      min: min.value
    })
  }

  return (
    <>
      <Header />

      <div className="cadastro">
        <h1>Cadastro</h1> <br />
        <Alert type="error" opened={error.hasError}>{error.message}</Alert>
        <Alert type="success" opened={success}>Usuário Cadastrado com sucesso!</Alert>
        {success && <Link to='/'>Ver Lista</Link>}
        <form onSubmit={(event) => handleSubmit(event)}>
          <p>Name: <br /> <input type="text" name="name" /></p>
          <p>Imagem <br /> <input type="text" name="img" /></p>
          <p>Gênero <br /> <input type="text" name="genero" /></p>
          <p>Min: <br /> <input type="text" name="min" /></p>
          <ButtonLoading type="submit" isLoading={isLoading}>Send</ButtonLoading>
        </form>
      </div>

      <Footer/>
    </>
  )
}

export default SignUp