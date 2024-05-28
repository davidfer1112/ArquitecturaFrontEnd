import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import { Player } from "@lottiefiles/react-lottie-player";
import "./About.css";

const About = () => {
    return (
        <>
            <Header />
            <section className="about-hero">
                <h1>Sobre Nosotros</h1>
                <p>Mi Portal es un comercio único que integra Pods e inteligencia artificial para entender los gustos de nuestros clientes. Creado por estudiantes de la Universidad Javeriana, los Chakales.</p>
            </section>
            <section className="about-content">
            <div className="about-section">
                    <div className="text-content">
                        <h2>Nuestra Visión</h2>
                        <p>En Mi Portal, nuestra visión es revolucionar el comercio electrónico mediante el uso de tecnologías avanzadas como Pods e inteligencia artificial. Queremos ofrecer a nuestros clientes una experiencia de compra personalizada y eficiente.</p>
                    </div>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/af496819-2643-4971-87d7-ce54e3554cda/CDaEi0B6VV.json"
                        style={{ height: '300px', width: '300px' }}
                    />
                </div>
                <div className="about-section">
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/2741f6b0-d52d-434f-8548-c7a0530c421f/6BOulS0vPz.json"
                        style={{ height: '300px', width: '300px' }}
                    />
                    <div className="text-content">
                        <h2>¿Qué nos hace únicos?</h2>
                        <p>Mi Portal no es solo una tienda en línea, es una plataforma inteligente que aprende de tus preferencias y gustos. Utilizamos Pods para asegurar la privacidad y seguridad de tus datos, y empleamos inteligencia artificial para recomendar productos que realmente te interesan.</p>
                    </div>
                </div>
                <div className="about-section">
                    <div className="text-content">
                        <h2>Creado por los Chakales</h2>
                        <p>Somos un equipo de estudiantes innovadores de la Universidad Javeriana, comprometidos con llevar la tecnología al siguiente nivel. Nuestra pasión por la tecnología y el comercio electrónico nos impulsa a crear soluciones únicas y efectivas.</p>
                    </div>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/08b420ef-e1d6-4d61-bd51-42ca5d5ab288/z8YwsGb8CA.json"
                        style={{ height: '300px', width: '300px' }}
                    />
                </div>
               
            
            </section>
            <Footer />
        </>
    );
};

export default About;
