import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import { useSession } from "@inrupt/solid-ui-react";
import { CartModel } from "../../models/CartModel";
import { CartItemModel } from "../../models/CartItemModel";
import addCarrito from "../../assets/images/addCarrito.svg";
import toast, { Toaster } from 'react-hot-toast';
import { UserDataModel } from '../../models/UserDataModel';
import { ensureUserDataFile } from '../../components/PodsComponent/PodsComponent';
import "./Carrito.css";

const Carrito = () => {
    const [cart, setCart] = useState<CartModel | null>(null);
    const [costoEnvio, setCostoEnvio] = useState<number | null>(null);
    const [distancia, setDistancia] = useState<number | null>(null);
    const [tiempoEstimado, setTiempoEstimado] = useState<number | null>(null);
    const { session } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (!session || !session.info || !session.info.webId) {
                console.error("Usuario no logueado o webId no disponible");
                return;
            }

            const webid = session.info.webId;
            const response = await fetch('https://miportalnetcore-ra6b.onrender.com/Cart/Get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ webid: webid }),
            });

            if (response.ok) {
                const data = await response.json();
                setCart(data);
                fetchCostoEnvio();
            } else {
                console.error("Error al obtener el carrito");
            }
        };

        fetchCart();
    }, [session]);

    const fetchCostoEnvio = async () => {
        if (!session || !session.info || !session.info.webId) {
            console.error("Usuario no logueado o webId no disponible");
            return;
        }

        const webid = session.info.webId;
        const baseUrl = webid.replace('profile/card#me', '');
        const fileUrl = `${baseUrl}public/miportal/userData.ttl`;

        const userData: UserDataModel | null = await ensureUserDataFile(fileUrl, session);

        if (!userData || !userData.address) {
            console.error("Dirección de usuario no disponible");
            return;
        }

        const response = await fetch('/api/webapp-jaxrs/api/envios/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                origen: "Pontificia Universidad Javeriana",
                destino: userData.address,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setCostoEnvio(data.costoEnvio);
            setDistancia(data.distanciaEnKm);
            setTiempoEstimado(data.tiempoEnMinutos / 60); // Convertir minutos a horas
        } else {
            console.error("Error al calcular el costo de envío");
        }
    };

    const eliminarItem = async (itemId: number) => {
        if (!session || !session.info || !session.info.webId) {
            console.error("Usuario no logueado o webId no disponible");
            return;
        }

        const webid = session.info.webId;
        const response = await fetch('https://miportalnetcore-ra6b.onrender.com/Cart/Remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ webid: webid, itemId: itemId }),
        });

        if (response.ok) {
            setCart(prevCart => {
                if (!prevCart) return prevCart;
                return {
                    ...prevCart,
                    cartItems: prevCart.cartItems.filter(item => item.cartItemId !== itemId)
                };
            });
            console.log("Producto eliminado del carrito");
            toast.success('Producto eliminado del carrito con éxito');
        } else {
            console.error("Error al eliminar el producto del carrito");
        }
    };

    if (!cart) {
        return <div>Cargando...</div>;
    }

    const calcularTotal = () => {
        return cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const formatearPrecio = (precio: number) => {
        return precio.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    };

    const handlePagar = () => {
        navigate('/confirmar-pago', { state: { cart, totalAmount: calcularTotal() + (costoEnvio || 0), costoEnvio, distancia, tiempoEstimado } });
    };

    return (
        <>
            <Header />
            <div className="carrito-container">
                <h1>Carrito de Compras</h1>
                {cart.cartItems.length === 0 ? (
                    <div className="carrito-vacio">
                        <img src={addCarrito} alt="Carrito vacío" className="imagen-carrito-vacio" />
                        <h2>Aún no hay productos. Sigue comprando.</h2>
                    </div>
                ) : (
                    <>
                        <div className="carrito-items">
                            {cart.cartItems.map((item: CartItemModel) => (
                                <div key={item.cartItemId} className="carrito-item">
                                    <img src={item.product.imageUrl} alt={item.product.productName} />
                                    <div className="carrito-item-info">
                                        <h2>{item.product.productName}</h2>
                                        <p>Precio unitario: {formatearPrecio(item.product.price)}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p>Subtotal: {formatearPrecio(item.product.price * item.quantity)}</p>
                                        <button onClick={() => eliminarItem(item.cartItemId)} className="eliminar-button">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="carrito-total">
                            <h2>Total productos: {formatearPrecio(calcularTotal())}</h2>
                            {costoEnvio !== null && (
                                <>
                                    <h2>Costo de envío: {formatearPrecio(costoEnvio)}</h2>
                                    <p>Distancia: {distancia?.toFixed(2)} km</p>
                                    <p>Tiempo estimado: {tiempoEstimado?.toFixed(2)} horas</p> {/* Convertir minutos a horas */}
                                </>
                            )}
                            <h2>Total: {formatearPrecio(calcularTotal() + (costoEnvio || 0))}</h2>
                            <button className="pagar-button" onClick={handlePagar}>Pagar</button>
                        </div>
                    </>
                )}
            </div>
            <Toaster />
            <Footer />
        </>
    );
};


export default Carrito;
