
import Header from "../../components/Header-component/heder-component"
import Footer from "../../components/Footer-component/footer-component"
import ProductosVenta from "../../components/Productos-venta-component/productos-venta-component"
import FondoTienda from "../../assets/images/fondo-tienda.jpg"
import ProductoIMG from '../../assets/images/Procducto.svg';
import Compra from "../../assets/images/Compra.svg"
import "./productos.css"

const Productos = () => {

    return(
        <>
            <Header />

            <section className="inicio-productos">
                <h1>Explora nuestra selección de productos</h1>
                <p>Descubre una amplia gama de productos de alta calidad.</p>
            </section>

            <section className="muestra-productos">
                <div className="procutos-titulos">
                    <h2>Productos</h2>
                    <p>Explora nuestra amplia selección de productos disponibles.</p>
                </div>

                <div className="view-productos">
                    <ProductosVenta imagenUrl={FondoTienda}/>
                    <ProductosVenta imagenUrl={ProductoIMG}/>
                    <ProductosVenta imagenUrl={Compra}/>
                    <ProductosVenta imagenUrl={FondoTienda}/>
                    <ProductosVenta imagenUrl={ProductoIMG}/>
                    <ProductosVenta imagenUrl={Compra}/>
                    <ProductosVenta imagenUrl={FondoTienda}/>
                    <ProductosVenta imagenUrl={ProductoIMG}/>
                </div>

                <div className="boton-muestra">
                    <button>Ver más</button>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Productos;