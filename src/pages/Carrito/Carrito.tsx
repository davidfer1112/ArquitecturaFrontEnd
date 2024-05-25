import { useEffect, useState } from 'react';
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import { useSession } from "@inrupt/solid-ui-react";
import { CartModel} from "../../models/CartModel";
import { CartItemModel } from "../../models/CartItemModel";
import "./Carrito.css";

const Carrito = () => {
    const [cart, setCart] = useState<CartModel | null>(null);
    const { session } = useSession();

    useEffect(() => {
        const fetchCart = async () => {
            if (!session || !session.info || !session.info.webId) {
                console.error("Usuario no logueado o webId no disponible");
                return;
            }

            const webid = session.info.webId;
            const response = await fetch('http://localhost:5064/Cart/Get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ webid: webid }),
            });

            if (response.ok) {
                const data = await response.json();
                setCart(data);
            } else {
                console.error("Error al obtener el carrito");
            }
        };

        fetchCart();
    }, [session]);

    if (!cart) {
        return <div>Cargando...</div>;
    }

    const calcularTotal = () => {
        return cart.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const formatearPrecio = (precio: number) => {
        return precio.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });
    };

    return (
        <>
            <Header />
            <div className="carrito-container">
                <h1>Carrito de Compras</h1>
                <div className="carrito-items">
                    {cart.cartItems.map((item: CartItemModel) => (
                        <div key={item.cartItemId} className="carrito-item">
                            <img src={item.product.imageUrl} alt={item.product.productName} />
                            <div className="carrito-item-info">
                                <h2>{item.product.productName}</h2>
                                <p>Precio unitario: {formatearPrecio(item.product.price)}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Subtotal: {formatearPrecio(item.product.price * item.quantity)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carrito-total">
                    <h2>Total: {formatearPrecio(calcularTotal())}</h2>
                    <button className="pagar-button">Pagar</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Carrito;