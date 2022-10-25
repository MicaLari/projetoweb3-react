import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Films from './pages/Films'
import Series from './pages/Series'
import Lancamentos from './pages/Lancamentos'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/filmes' element={<Films />} />
      <Route path='/series' element={<Series />} />
      <Route path='/lancamentos' element={<Lancamentos />} />
    </Routes>
  );
}

export default App;