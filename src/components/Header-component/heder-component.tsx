import { useEffect, useState } from "react";
import { SessionProvider, LoginButton, useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/Logo.svg";
import carrito from "../../assets/images/carrito.svg";
import User from "../../assets/images/User.svg";
import Config from "../../assets/images/Config.svg"; // Agregué la imagen para configuraciones
import Menu from "../../assets/images/Menu.svg";
import Back from "../../assets/images/Back.svg";
import LogOut from "../../assets/images/LogOut.svg";
import "./header-component.css";
import React from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { session } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session && session.info && session.info.isLoggedIn) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [session]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const irAProductos = () => navigate('/Productos');
    const irAHome = () => navigate('/');

    return (
        <header className="header">
            <button id="boton-logo" onClick={irAHome}>
                <img src={Logo} alt="Logo Mi Portal" className="logo"/>
            </button>
            <div className="nav-botones">
                <ul>
                    <li><button onClick={irAProductos}>Ver Productos</button></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
                {isLoggedIn ? (
                    <React.Fragment>
                        <button className="">
                            <img src={carrito} alt="carrito" />
                        </button>
                        <button className="">
                            <img src={Config} alt="configuraciones" />
                        </button>
                        <button onClick={() => { 
                            session.logout(); 
                            setIsLoggedIn(false); 
                            window.location.reload(); 
                        }}>
                            <img src={LogOut} alt="LogOut" />
                        </button>
                    </React.Fragment>
                ) : (
                    <button className="" onClick={irAHome}>
                        <SessionProvider sessionId="some-id">
                            <LoginButton
                                oidcIssuer="https://solidcommunity.net/"
                                redirectUrl={window.location.origin + "/Productos"}
                                onError={console.error}
                            >
                                <img src={User} alt="user" />
                            </LoginButton>
                        </SessionProvider>
                    </button>
                )}
                <button onClick={toggleMenu} className="menu-hamburguesa">
                    <img src={Menu} alt="menu" />
                </button>
            </div>
            {isMenuOpen && (
                <div className="overlay">
                    <button onClick={toggleMenu} className="close-menu">
                        <img src={Back} alt="back" />
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