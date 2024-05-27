import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import Producto from "../../components/Producto-component/producto-component";
import Compra from "../../assets/images/Compra.svg";
import "./Home.css";

// const UserProfile = () => {
//   const { session } = useSession();
//   if (!session.info.isLoggedIn) return <p>User not logged in</p>;
//   const webId = session.info.webId;
//   if (!webId) return <p>No WebID found</p>;
//   return (
//       <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
//           <Text property="http://www.w3.org/2006/vcard/ns#fn" edit autosave />
//       </CombinedDataProvider>
//   );
// }

const Home = () => {
  let navigate = useNavigate();
  const [productos, setProductos] = useState<ProductModel[]>([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('https://miportalnetcore.onrender.com/products');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);
  


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
          <h1>Nuestra Colección</h1>
          <p>Explora nuestra amplia selección de productos con imágenes, descripciones y precios para una compra fácil.</p>
        </div>
        <div className="productos-home">
          {productos.slice(0,6).map(producto => (
            <Producto
              key={producto.productId}
              imagenUrl={producto.imageUrl}
              nombre={producto.productName}
              precio={producto.price}
              productId={producto.productId}
            />
          ))}
        </div>
        
      </section>

      <Footer />
    </>
  );
};

export default Home;
