import { useEffect, useState } from "react";
import { SessionProvider, LoginButton, useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/Logo.svg";
import carrito from "../../assets/images/carrito.svg";
import User from "../../assets/images/User.svg";
import Config from "../../assets/images/Config.svg"; 
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
    const irAConfiguracion = () => navigate('/configuracion');
    const irACarrito = () => navigate('/carrito');
    const irAAbout = () => navigate('/about'); // Añadir el manejador de navegación para About

    const verificarUsuario = async () => {
        if (!session || !session.info || !session.info.webId) {
            console.error("Usuario no logueado o webId no disponible");
            return;
        }
        
        const webid = session.info.webId;
        const response = await fetch('https://miportalnetcore.onrender.com/Users/CheckOrCreate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ webid: webid }),
        });

        if (response.ok) {
            console.log("Verificación exitosa");
            irACarrito();
        } else {
            console.error("Verificación fallida");
        }
    };

    return (
        <header className="header">
            <button id="boton-logo" onClick={irAHome}>
                <img src={Logo} alt="Logo Mi Portal" className="logo-miportal"/>
            </button>
            <div className="nav-botones">
                <ul>
                    <li><button onClick={irAProductos}>Ver Productos</button></li>
                    <li><button onClick={irAAbout}>About</button></li> {/* Actualizar el enlace About */}
                    <li><button onClick={() => navigate('/contact')}>Contact</button></li> {/* Actualizar el enlace Contact */}
                </ul>
                {isLoggedIn ? (
                    <React.Fragment>
                        <button className="" onClick={verificarUsuario}>
                            <img src={carrito} alt="carrito" />
                        </button>
                        <button className="" onClick={irAConfiguracion}>
                            <img src={Config} alt="configuraciones" />
                        </button>
                        <button onClick={() => { 
                            session.logout(); 
                            setIsLoggedIn(false); 
                            window.location.reload();
                            irAHome();
                        }}>
                            <img src={LogOut} alt="LogOut" />
                        </button>
                    </React.Fragment>
                ) : (
                    <button className="">
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
                        <li><button onClick={irAProductos}>Productos</button></li>
                        <li><button onClick={irAAbout}>About</button></li> {/* Actualizar el enlace About */}
                        <li><button onClick={() => navigate('/contact')}>Contact</button></li> {/* Actualizar el enlace Contact */}
                    </ul>
                </div>
            )}
        </header>
    );
}

export default Header;
