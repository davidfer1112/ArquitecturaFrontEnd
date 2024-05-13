import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductModel } from '../../models/DeatailedProductModel'; // Asegúrate de importar el modelo extendido
import Header from '../../components/Header-component/heder-component';
import Footer from '../../components/Footer-component/footer-component';
import './DetalleProducto.css';

const DetalleProducto = () => {
    const [producto, setProducto] = useState<DetailedProductModel | null>(null);
    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
        if (!productId) return;

        const fetchProducto = async () => {
            const response = await fetch(`http://localhost:5064/products/${productId}`);
            const data = await response.json();
            setProducto(data);
        };

        fetchProducto();
    }, [productId]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Header />

            <section className='section-detalle-producto'>
                <div className="contenido-detalle">
                
                    <img src={producto.imageUrl} alt={producto.productName} />

                    <div className="info-producto">
                        <h1>{producto.productName}</h1>
                        <div className="descripcion-detalle">

                            <p><span>Descripcion</span><br /> {producto.description}</p>
                        </div>
                        <p><span>Categoria</span><br />{producto.category?.categoryName}</p>
                        <p><span>Precio</span><br /> $ {producto.price}</p>
                        <div className="inputs-producto">
                            <button>Agregar al carrito</button>
                            <input type="number" min="1" defaultValue="1" />
                        </div>
                        
                    </div>
                </div>
            </section>
            
            

            <Footer />
        </div>
    );
}

export default DetalleProducto;
