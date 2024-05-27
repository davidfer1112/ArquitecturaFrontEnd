import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { DetailedProductModel } from '../../models/DeatailedProductModel'; 
import Header from '../../components/Header-component/heder-component';
import Footer from '../../components/Footer-component/footer-component';
import { useSession } from "@inrupt/solid-ui-react"; 
import './DetalleProducto.css';

const DetalleProducto = () => {
    const [producto, setProducto] = useState<DetailedProductModel | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { productId } = useParams<{ productId: string }>();
    const { session } = useSession();

    useEffect(() => {
        if (!productId) return;

        const fetchProducto = async () => {
            const response = await fetch(`https://miportalnetcore-ra6b.onrender.com/products/${productId}`);
            const data = await response.json();
            setProducto(data);
        };

        fetchProducto();
    }, [productId]);

    const handleAddToCart = async () => {
        if (!session || !session.info || !session.info.webId || !producto) {
            console.error("Usuario no logueado, webId no disponible, o producto no cargado");
            toast.error('Usuario no logueado');
            return;
        }

        const webid = session.info.webId;
        const payload = {
            webid: webid,
            productId: producto.productId, 
            quantity: quantity,
        };

        const response = await fetch('https://miportalnetcore-ra6b.onrender.com/Cart/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log("Producto agregado al carrito exitosamente");
            toast.success('Producto agregado al carrito');
        } else {
            console.error("Fallo al agregar el producto al carrito");
            toast.error('Error al agregar el producto al carrito');
        }
    };

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
                            <button onClick={handleAddToCart}>Agregar al carrito</button>
                            <input 
                                type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(parseInt(e.target.value))} 
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Toaster />

            <Footer />
        </div>
    );
}

export default DetalleProducto;
