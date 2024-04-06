import React from 'react';
import "./producto-component.css";

// Asume que esta interfaz está definida en el mismo archivo o impórtala si está definida en otro lugar
interface ProductoProps {
  imagenUrl: string;
}

const Producto: React.FC<ProductoProps> = ({ imagenUrl }) => {
    return (
        <div className="container-producto">
            <img src={imagenUrl} alt="Imagen genérica"/>
            <div className="descripcion-procucto">
                <h2>Nombre del producto</h2>
                <p>precios</p>
            </div>
            <button>Agregar al carrito</button>
        </div>
    );
}

export default Producto;
