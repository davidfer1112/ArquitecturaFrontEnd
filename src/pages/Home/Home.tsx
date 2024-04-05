import Header from "../../components/Header-component/heder-component"
import Footer from "../../components/Footer-component/footer-component"
import Compra from "../../assets/images/Compra.svg"
import "./home.css"

const Home = () => (
  <section className="Home">
    <Header />

    <section className="sectionHome">
      <div className="info-inicial">
        <h1>¡Descubre los productos más populares en nuestra tienda en línea!</h1>
        <p>Explora nuestra amplia selección de productos y encuentra lo que necesitas.</p>
        <div className="botones-inicial">
          <button>Comprar</button>
          <button>Más información</button>
        </div>
      </div>
      <div className="imagen-inicial">
        <img src={Compra} alt="" />
      </div>
      
    </section>

    

    
  <Footer />

  </section>
)

export default Home

