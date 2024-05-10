
import './productos-venta-component.css';

interface ProductoProps {
    imagenUrl: string;
}

const ProductosVenta: React.FC<ProductoProps> = ({ imagenUrl }) => {
    return (
        <div className='container-producto-venta'>
            <button>
                <img src={imagenUrl} alt="" />  
            </button>

            <div className='info-producto-venta'>
                <h3>Producto</h3>
                <p>$00.00</p>
            </div>
            
        </div>
    )
}

export default ProductosVenta;