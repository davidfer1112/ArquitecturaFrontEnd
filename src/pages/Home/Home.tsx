import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header-component/heder-component"
import Footer from "../../components/Footer-component/footer-component"
import Producto from "../../components/Producto-component/producto-component"
import Compra from "../../assets/images/Compra.svg"
import ProductoImg from "../../assets/images/Procducto.svg"
import "./home.css"

const Home = () => {

  let navigate = useNavigate();

    const irAProductos = () => {
        navigate('/Productos');
    }

  return (
    <>
      <Header />

      {/*Info inicial */}
      <section className="section-home">
        <div className="info-inicial">
          <h1>¡Descubre los productos más populares en nuestra tienda en línea!</h1>
          <p>Explora nuestra amplia selección de productos y encuentra lo que necesitas.</p>
          <div className="botones-inicial">
            <button onClick={irAProductos}>Comprar</button>
            <button>Más información</button>
          </div>
        </div>
        <div className="imagen-inicial">
          <img src={Compra} alt="" />
        </div>
      </section>

      {/*Productos*/}
      <section className="section-home-proctos">

        <div className="encabezado-producto">
          <h1>Productos</h1>
          <p>
            Explora nuestra amplia selección de productos con imágenes, 
            descripciones y precios para una compra fácil.
          </p>
        </div>

        <div className="procutos-home">

          <Producto imagenUrl={Compra}/>
          <Producto imagenUrl={ProductoImg}/>
          <Producto imagenUrl={Compra}/>
          <Producto imagenUrl={ProductoImg}/>
          <Producto imagenUrl={Compra}/>
          <Producto imagenUrl={ProductoImg}/>

        </div>



      </section>


    

    
      <Footer />
    </>
  )

}

export default Home

