import React, { useEffect, useState } from "react";
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import ProductosVenta from "../../components/Productos-venta-component/productos-venta-component";
import "./productos.css";
import { DetailedProductModel } from "../../models/DeatailedProductModel";

const Productos = () => {
    const [productos, setProductos] = useState<DetailedProductModel[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');

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

    const productosFiltrados = categoriaSeleccionada
        ? productos.filter(producto => producto.category.categoryName === categoriaSeleccionada)
        : productos;

    // Extraer categorías únicas
    const categorias = Array.from(new Set(productos.map(p => p.category.categoryName)));

    return (
        <>
            <Header />

            <section className="inicio-productos">
                <h1>Explora nuestra selección de productos</h1>
                <p>Descubre una amplia gama de productos de alta calidad.</p>
            </section>

            <section className="filtro-productos">
                <h2>Categorias</h2>
                <div className="radio-input">
                    <input 
                        type="radio" 
                        id="todas" 
                        name="categoria-radio" 
                        value="" 
                        checked={categoriaSeleccionada === ''}
                        onChange={() => setCategoriaSeleccionada('')}
                    />
                    <label htmlFor="todas">Todas</label>
                    
                    {categorias.map(categoria => (
                        <React.Fragment key={categoria}>
                            <input 
                                type="radio" 
                                id={categoria} 
                                name="categoria-radio" 
                                value={categoria} 
                                checked={categoriaSeleccionada === categoria}
                                onChange={() => setCategoriaSeleccionada(categoria)}
                            />
                            <label htmlFor={categoria}>{categoria}</label>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            <section className="muestra-productos">
                <div className="procutos-titulos">
                    <h2>Nuestra Colección</h2>
                    <p>Explora nuestra amplia selección de productos disponibles.</p>
                </div>

                <div className="view-productos">
                    {productosFiltrados.map(producto => (
                        <ProductosVenta
                            key={producto.productId}
                            producto={producto}
                        />
                    ))}
                </div>

                {/* <div className="boton-muestra">
                    <button>Ver más</button>
                </div> */}
            </section>

            <Footer />
        </>
    );
}

export default Productos;
