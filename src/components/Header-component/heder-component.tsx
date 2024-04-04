
import Logo from "../../assets/images/Logo.svg"
import carrito from "../../assets/images/carrito.svg" 
import User from "../../assets/images/User.svg"
import "./header-component.css"


const Header = () => (
    <header className="header">
        <img src={Logo} alt="Logo Mi Portal"  className="logo"/>
            
        
        <div className="nav-botones">
            <ul>
                <li><a href="/">Productos</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Contact</a></li>
            </ul>
            <button className="">
                <img src={User} alt="user" />
            </button>
            <button className="">
                <img src={carrito} alt="carrito" />
            </button>
        </div>
    </header>
  )
  
  export default Header;
  