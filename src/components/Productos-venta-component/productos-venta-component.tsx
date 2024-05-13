import React from 'react';
import { Link } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';
import './productos-venta-component.css';

const ProductosVenta: React.FC<{ producto: ProductModel }> = ({ producto }) => {
    const precioFormateado = producto.price.toLocaleString();
    const productLink = `/productos/${producto.productId}`;;

    return (
        <div className='container-producto-venta'>
            <button>
                <Link to={productLink}>
                    <img src={producto.imageUrl} alt={producto.productName} />
                </Link>
            </button>
            <div className='info-producto-venta'>
                <h3>{producto.productName}</h3>
                <p>${precioFormateado}</p>
            </div>
        </div>
    );
}

export default ProductosVenta;