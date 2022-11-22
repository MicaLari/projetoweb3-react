import { useNavigate } from "react-router-dom"
import { API_PATH } from "../config"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer";
import './Login.css'



const Login = () => {

  const [,setUserLogged] = useAuth()
  const navigate = useNavigate()

  const login = async (values) => {
    const response = await fetch(`${API_PATH}auth/login`, {
      method: 'POST',
      body: JSON.stringify(values)
    })
    const result = await response.json()
    if(result?.success){
      const auth = {
        isLogged: true,
        idUser: result.data.idUser,
        token: result.data.token,
        role: result.data.role,
      }
      setUserLogged(auth)
      localStorage.setItem('user-auth', JSON.stringify(auth))
      if(result.data.role.includes('admin')){
        navigate('/admin')
      }else{
        navigate('/')
      }

    } else {
      alert(result?.error?.message || 'Erro no servidor')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { email, pass } = event.target
    login({ email: email.value, pass: pass.value })
  }


  return (
    <>
      <Header />

      <div className="login">
        <h1 className="test">Login</h1> <br />
        <form className="box" onSubmit={(event) => handleSubmit(event)}>
          <p className="email">Email: <br /> <input type="text" name="email" /></p>
          <p className="pass">Pass: <br /> <input type="text" name="pass" /></p>
          <button className="button" type="submit">Send</button>
        </form>
      </div> <br />

      <Footer/>
    
    </>
  )
}

export default Login