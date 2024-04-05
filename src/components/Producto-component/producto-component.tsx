import "./producto-component.css"
import procuto from "../../assets/images/Procducto.svg"

const Producto = () => {
    return (
        <div className="container-producto">
            <img src={procuto} alt="Imagen genérica"/>
            <div className="descripcion-procucto">
                <h2>Nombre del producto</h2>
                <p>precios</p>
            </div>
            <button>Agregar al carrito</button>
        </div>
    )
}

export default Producto;

