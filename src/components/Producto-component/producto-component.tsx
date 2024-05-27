import React from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import toast, { Toaster } from 'react-hot-toast';
import "./producto-component.css";

interface ProductoProps {
    imagenUrl: string;
    nombre: string;
    precio: number;
    productId: number; // Asegúrate de incluir el productId
}

const Producto: React.FC<ProductoProps> = ({ imagenUrl, nombre, precio, productId }) => {
    const { session } = useSession();

    // Formatear el precio con separador de miles
    const precioFormateado = precio.toLocaleString('es-ES', { style: 'currency', currency: 'COP' });

    const handleAddToCart = async () => {
        if (!session || !session.info || !session.info.webId) {
            console.error("Usuario no logueado o webId no disponible");
            toast.error('Usuario no logueado');
            return;
        }

        const webid = session.info.webId;
        const payload = {
            webid: webid,
            productId: productId,
            quantity: 1,
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

    return (
        <div className="container-producto">
            <img src={imagenUrl} alt={nombre} />
            <div className="descripcion-producto">
                <h2>{nombre}</h2>
                <p>{precioFormateado}</p>
            </div>
            <button onClick={handleAddToCart}>Agregar al carrito</button>
            <Toaster />
        </div>
    );
}

export default Producto;
