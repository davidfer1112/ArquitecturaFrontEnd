import React, { useEffect, useState } from "react";
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import ProductosVenta from "../../components/Productos-venta-component/productos-venta-component";
import "./productos.css";
import { DetailedProductModel } from "../../models/DeatailedProductModel";
import { useSession } from "@inrupt/solid-ui-react";

const Productos = () => {
    const { session } = useSession();
    const [productos, setProductos] = useState<DetailedProductModel[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [productosRecomendados, setProductosRecomendados] = useState<DetailedProductModel[]>([]);
    const [webId, setWebId] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (session && session.info && session.info.webId) {
            setWebId(session.info.webId);
        } else {
            setWebId(null);
        }
    }, [session]);

    const fetchProductos = async () => {
        try {
            const response = await fetch('https://miportalnetcore-ra6b.onrender.com/products');
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchRecomendaciones = async () => {
        try {
            const response = await fetch('https://recomendaciones-arqui-axaj.onrender.com/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ webid: webId }),
            });
            const data = await response.json();
            const recommendedProducts = await Promise.all(
                data.recommendations.map(async (id: number) => {
                    const productResponse = await fetch(`https://miportalnetcore-ra6b.onrender.com/products/${id}`);
                    return await productResponse.json();
                })
            );
            setProductosRecomendados(recommendedProducts);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        if (categoriaSeleccionada === 'Recomendaciones' && webId) {
            fetchRecomendaciones();
        } else {
            fetchProductos();
        }
    }, [categoriaSeleccionada, webId]);

    const productosFiltrados = categoriaSeleccionada === 'Recomendaciones'
        ? productosRecomendados
        : categoriaSeleccionada
            ? productos.filter(producto => producto.category.categoryName === categoriaSeleccionada)
            : productos;

    const categorias = Array.from(new Set(productos.map(p => p.category.categoryName)));

    return (
        <>
            <Header />

            <section className="inicio-productos">
                <h1>Explora nuestra selección de productos</h1>
                <p>Descubre una amplia gama de productos de alta calidad.</p>
            </section>

            <section className={`filtro-productos ${expanded ? 'expanded' : ''}`}>
                <button className="toggle-button" onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Ocultar Categorías' : 'Mostrar Categorías'}
                </button>
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

                    {webId && (
                        <React.Fragment>
                            <input 
                                type="radio" 
                                id="recomendaciones" 
                                name="categoria-radio" 
                                value="Recomendaciones" 
                                checked={categoriaSeleccionada === 'Recomendaciones'}
                                onChange={() => setCategoriaSeleccionada('Recomendaciones')}
                            />
                            <label htmlFor="recomendaciones">Recomendaciones</label>
                        </React.Fragment>
                    )}
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
            </section>

            <Footer />
        </>
    );

}

export default Productos;
