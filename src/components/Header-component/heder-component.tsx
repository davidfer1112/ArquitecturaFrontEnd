import { useState } from "react"
import Logo from "../../assets/images/Logo.svg"
import carrito from "../../assets/images/carrito.svg" 
import User from "../../assets/images/User.svg"
import Menu from "../../assets/images/Menu.svg"
import Back from "../../assets/images/Back.svg"
import "./header-component.css"



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return(
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
            <button onClick={toggleMenu} className="menu-hamburguesa">
                <img src={Menu} alt="menu" />
            </button>
        
      </div>
      
      {isMenuOpen && (
        <div className="overlay">
            <button onClick={toggleMenu} className="close-menu">
                <img src={Back} alt ="back" />
            </button>
                <ul>
                    <li><a href="/">Productos</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
        </div>
      )}
    </header>
  );
}

export default Header;