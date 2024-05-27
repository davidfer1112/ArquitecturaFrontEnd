import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import {
  fetchUserData,
  fetchContainerContents,
  createFolder,
  createUserData,
  fetchUserDataFromPod,
} from '../../components/PodsComponent/PodsComponent'
import { UserDataModel } from '../../models/UserDataModel';
import { ProductModel } from '../../models/ProductModel';
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import Producto from "../../components/Producto-component/producto-component";
import Compra from "../../assets/images/Compra.svg";
import "./Home.css";

const UserProfile = () => {
  const { session } = useSession();
  if (!session.info.isLoggedIn) return <p>User not logged in</p>;
  const webId = session.info.webId;
  if (!webId) return <p>No WebID found</p>;
  return (
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
          <Text property="http://www.w3.org/2006/vcard/ns#fn" edit autosave />
      </CombinedDataProvider>
  );
}

const Home = () => {
  let navigate = useNavigate();
  const { session } = useSession();
  const webId = session.info.webId;
  const [userData, setUserData] = useState<UserDataModel | null>(null);
  const [productos, setProductos] = useState<ProductModel[]>([]);
  const [containerContents, setContainerContents] = useState<string[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

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

  const handleFetchUserData = async () => {
    if (webId) {
      const name = await fetchUserData(webId);
      setUserName(name || '');
    }
  };

  const fetchContents = async () => {
    if (session.info.isLoggedIn) {
      const containerUrl = session.info?.webId ? session.info.webId.replace('profile/card#me', 'public/') : '';
      console.log('URL del contenedor:', containerUrl);  
      const contents = await fetchContainerContents(containerUrl);
      setContainerContents(contents || []);
    }
  };

  const handleCreateFolder = async () => {
    if (session.info.isLoggedIn) {
      const baseUrl = webId ? webId.replace('profile/card#me', ''): ''; // Obtener la base URL del POD
      const containerUrl = `${baseUrl}public/miportal/`; // URL del nuevo contenedor
      const result = await createFolder(containerUrl);
      if (result) {
        alert('Carpeta "miportal" creada con éxito en "public"');
      } else {
        alert('No se pudo crear la carpeta');
      }
    } else {
      alert('Usuario no autenticado');
    }
  };

  const handleCreateUserData = async () => {
    if (session.info.isLoggedIn) {
      const baseUrl = webId ? webId.replace('profile/card#me', ''): ''; // Obtener la base URL del POD
      const containerUrl = `${baseUrl}public/miportal/`; // URL del nuevo contenedor
      const userData = {
        name: "Juan Pérez",
        address: "Calle Falsa 123, Ciudad Ficticia",
        email: "juan@example.com"
      };
      await createUserData(containerUrl, userData);
    } else {
      alert('Usuario no autenticado');
    }
  };

  const handleLoadUserData = async () => {
    if (session.info.isLoggedIn) {
      const baseUrl = webId ? webId.replace('profile/card#me', '') : '';
      const fileUrl = `${baseUrl}public/miportal/userData.ttl`;
      const data = await fetchUserDataFromPod(fileUrl, session);
      setUserData(data ? { name: data.name || '', address: data.address || '', email: data.email || '' } : null);
    } else {
      alert('Usuario no autenticado');
    }
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

      {/* <UserProfile /> 

      <button onClick={handleFetchUserData}>Mostrar datos del POD</button>
      {userName && <p>Nombre del usuario: {userName}</p>}

      <button onClick={fetchContents}>Mostrar contenido del Storage</button>
      {containerContents.length > 0 && (
        <ul>
          {containerContents.map(url => <li key={url}>{url}</li>)}
        </ul>
      )}

      <button onClick={handleCreateFolder}>Crear Carpeta miportal</button>

      <button onClick={handleCreateUserData}>Crear datos de usuario</button>

      <button onClick={handleLoadUserData}>Cargar Datos del Usuario</button>
        {userData && (
          <div>
            <p>Nombre: {userData.name}</p>
            <p>Dirección: {userData.address}</p>
            <p>Email: {userData.email}</p>
          </div>
        )} */}

      <Footer />
    </>
  );
};

export default Home;
