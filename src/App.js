import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Films from './pages/Films'
import Series from './pages/Series'
import Lancamentos from './pages/Lancamentos'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/filmes' element={<Films />} />
      <Route path='/series' element={<Series />} />
      <Route path='/lancamentos' element={<Lancamentos />} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Cadastro' element={<Cadastro/>}/>
    </Routes>
  );
}

export default App;