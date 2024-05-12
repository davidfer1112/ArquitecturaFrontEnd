import React from 'react';
import "./producto-component.css";

interface ProductoProps {
    imagenUrl: string;
    nombre: string;
    precio: number;
}

const Producto: React.FC<ProductoProps> = ({ imagenUrl, nombre, precio }) => {
    // Formatear el precio con separador de miles
    const precioFormateado = precio.toLocaleString();

    return (
        <div className="container-producto">
            <img src={imagenUrl} alt={nombre}/>
            <div className="descripcion-producto">
                <h2>{nombre}</h2>
                {/* Mostrar el precio formateado */}
                <p>$ {precioFormateado}</p>
            </div>
            <button>Agregar al carrito</button>
        </div>
    );
}

export default Producto;

