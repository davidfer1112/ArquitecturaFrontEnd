import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Error404 from './pages/Page-not-found/page-not-found.tsx';
import Productos from './pages/Productos/productos.tsx'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error404 />} /> {/* Captura todas las rutas no definidas */}
          <Route path='/Productos' element={<Productos/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

