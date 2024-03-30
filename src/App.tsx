import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Error404 from './pages/Error404/Error404.tsx'; 

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

