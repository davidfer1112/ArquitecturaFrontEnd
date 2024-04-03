import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/home.tsx';
import Error404 from './pages/Page-not-found/page-not-found.tsx'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error404 />} /> {/* Captura todas las rutas no definidas */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

