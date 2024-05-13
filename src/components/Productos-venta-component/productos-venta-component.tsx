
import React from 'react';
import { ProductModel } from '../../models/ProductModel';
import './productos-venta-component.css';

const ProductosVenta: React.FC<{ producto: ProductModel }> = ({ producto }) => {
    const precioFormateado = producto.price.toLocaleString();

    return (
        <div className='container-producto-venta'>
            <button>
                <img src={producto.imageUrl} alt={producto.productName} />
            </button>
            <div className='info-producto-venta'>
                <h3>{producto.productName}</h3>
                <p>${precioFormateado}</p>
            </div>
        </div>
    );
}

export default ProductosVenta;