import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Error404 from './pages/Page-not-found/page-not-found.tsx';
import Productos from './pages/Productos/productos.jsx'; 
import DetalleProducto from './pages/DetalleProducto/DetalleProducto.jsx';
import Configuracion from './pages/Configuracion/Configuracion.jsx';
import Carrito from './pages/Carrito/Carrito.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error404 />} /> {/* Captura todas las rutas no definidas */}
          <Route path='/Productos' element={<Productos/>}/>
          <Route path='/productos/:productId' element={<DetalleProducto/>}/>
          <Route path='/configuracion' element={<Configuracion/>}/>
          <Route path='/carrito' element={<Carrito/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

