
import Header from "../../components/Header-component/heder-component"
import Footer from "../../components/Footer-component/footer-component"
import ProductosVenta from "../../components/Productos-venta-component/productos-venta-component"
import "./productos.css"
import { useEffect, useState } from "react";
import { ProductModel } from "../../models/ProductModel";

const Productos = () => {

    const [productos, setProductos] = useState<ProductModel[]>([]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:5064/products'); 
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return(
        <>
            <Header />

            <section className="inicio-productos">
                <h1>Explora nuestra selección de productos</h1>
                <p>Descubre una amplia gama de productos de alta calidad.</p>
            </section>

            <section className="muestra-productos">
                <div className="procutos-titulos">
                    <h2>Nuestra Colección</h2>
                    <p>Explora nuestra amplia selección de productos disponibles.</p>
                </div>

                <div className="view-productos">
                    {productos.map(producto => (
                        <ProductosVenta
                            key={producto.productId}
                            producto={producto}  // Pasa todo el objeto de producto
                     />
                    ))}
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