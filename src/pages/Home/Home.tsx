import { useNavigate } from 'react-router-dom';
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import Producto from "../../components/Producto-component/producto-component";
import Compra from "../../assets/images/Compra.svg";
import ProductoImg from "../../assets/images/Procducto.svg";
import "./home.css";



const UserProfile = () => {
  const { session} = useSession();

  if (!session.info.isLoggedIn) return <p>User not logged in</p>;

  const webId = session.info.webId;

  // Asegurar que webId no es undefined antes de renderizar CombinedDataProvider
  if (!webId) return <p>No WebID found</p>;

  return (
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Text property="http://www.w3.org/2006/vcard/ns#fn" edit autosave />
      </CombinedDataProvider>
  );
}


const Home = () => {
  let navigate = useNavigate();

  const irAProductos = () => {
    navigate('/Productos');
  };

  return (
    <>
      <Header />

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

      <section className="section-home-proctos">
        <div className="encabezado-producto">
          <h1>Productos</h1>
          <p>Explora nuestra amplia selección de productos con imágenes, descripciones y precios para una compra fácil.</p>
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

       <UserProfile /> 
      

      <Footer />
    </>
  );
};

export default Home;
