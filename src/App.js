import {Routes, Route} from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider';
import Home from './pages/Home'
import Films from './pages/Films'
import Series from './pages/Series'
import Lancamentos from './pages/Lancamentos'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeAdmin from './pages/HomeAdmin';
import LayoutAdmin from './pages/LayoutAdmin';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/filmes' element={<Films />} />
        <Route path='/series' element={<Series />} />
        <Route path='/lancamentos' element={<Lancamentos />} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Cadastro' element={<Cadastro/>}/>

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />}/>
        </Route>
      
        <Route path='*' element={<NotFound />} status={404} />

      </Routes>

     

    </AuthProvider>
   
  );
}

export default App;