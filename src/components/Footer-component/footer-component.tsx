
import './footer-component.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#" onClick={() => navigate('/about')}>about us</a></li>
                            <li><a href="#" onClick={() => navigate('/configuracion')}>Configuración</a></li>
                            <li><a href="#" onClick={() => navigate('/privacy')}>privacy policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#" onClick={() => navigate('/contact')}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>online Hot 🥵 🥵</h4>
                        <ul>
                            <li><a href="#" onClick={() => navigate('/productos/1')}>Iphone</a></li>
                            <li><a href="#" onClick={() => navigate('/productos/13')}>Play 5</a></li>
                            <li><a href="#" onClick={() => navigate('/productos/11')}>Aloe</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="https://www.facebook.com/tuPerfil" target="_blank" rel="noopener noreferrer">
                                <img src="https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/Diseño_sin_título__1_-removebg-preview.png?alt=media&token=ae35d016-a0d6-4c1a-9804-1d8ca50e2d60" alt="Facebook" className="social-icon"/>
                            </a>
                            <a href="https://www.twitter.com/tuPerfil" target="_blank" rel="noopener noreferrer">
                                <img src="https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/Dise%C3%B1o_sin_t%C3%ADtulo__4_-removebg-preview.png?alt=media&token=d2c87305-af61-4648-897b-ea7cfa256142" alt="Pinterest" className="social-icon"/>
                            </a>
                            <a href="https://www.instagram.com/tuPerfil" target="_blank" rel="noopener noreferrer">
                                <img src="https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/Dise%C3%B1o_sin_t%C3%ADtulo__3_-removebg-preview.png?alt=media&token=fda9a1f9-ce6d-426c-b4fe-373a94a02c2e" alt="Instagram" className="social-icon"/>
                            </a>
                            <a href="https://www.linkedin.com/in/tuPerfil" target="_blank" rel="noopener noreferrer">
                                <img src="https://firebasestorage.googleapis.com/v0/b/miportal-c92f1.appspot.com/o/Dise%C3%B1o_sin_t%C3%ADtulo__2_-removebg-preview.png?alt=media&token=e92b7e09-6366-400f-8e3e-190fe56f8e67" alt="Tik Tok" className="social-icon"/>
                            </a>
                        </div>
                    </div>				
                </div>
                <p>Ilustraciones por <a href="https://storyset.com/shopping">Storyset</a></p>
                <p>©Los Chakales</p>
            </div>
        </footer>
    )
}

export default Footer;
