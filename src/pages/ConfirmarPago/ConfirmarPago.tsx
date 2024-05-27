import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from "@inrupt/solid-ui-react";
import { fetchUserDataFromPod } from '../../components/PodsComponent/PodsComponent';
import { CartModel } from '../../models/CartModel';
import Header from '../../components/Header-component/heder-component';
import Footer from '../../components/Footer-component/footer-component';
import toast, { Toaster } from 'react-hot-toast';
import "./ConfirmarPago.css";

const ConfirmarPago = () => {
    const { session } = useSession();
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, totalAmount } = location.state as { cart: CartModel, totalAmount: number };
    const [metodoPago, setMetodoPago] = useState<string>('');
    const [cardDetails, setCardDetails] = useState({
        nombrePropietario: '',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: ''
    });
    const webId = session.info.webId;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails({
            ...cardDetails,
            [name]: value
        });
    };

    const handleFechaExpiracionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 4) {
            value = value.slice(0, 4); // Limit to 4 digits
        }
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2); // Add slash after first two digits
        }
        setCardDetails({
            ...cardDetails,
            fechaExpiracion: value
        });
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 3) {
            value = value.slice(0, 3); // Limit to 3 digits
        }
        setCardDetails({
            ...cardDetails,
            cvv: value
        });
    };

    const handleConfirmarCompra = async () => {
        if (!webId) {
            toast.error("Usuario no logueado o webId no disponible");
            return;
        }

        const baseUrl = webId.replace('profile/card#me', '');
        const fileUrl = `${baseUrl}public/miportal/userData.ttl`;

        const userData = await fetchUserDataFromPod(fileUrl, session);
        if (!userData) {
            toast.error("No se pudo obtener la información del usuario");
            return;
        }

        const orderDetails = cart.cartItems.map(item => ({
            ProductId: item.product.productId,
            Quantity: item.quantity,
            Price: item.product.price * item.quantity
        }));

        const orderData = {
            WebId: webId,
            OrderDate: new Date().toISOString(),
            Status: "Pending",
            TotalAmount: totalAmount,
            Username: userData.name,
            Email: userData.email,
            OrderDetails: orderDetails
        };

        const response = await fetch('https://miportalnetcore.onrender.com/Orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            toast.success("Orden creada con éxito");

            // Limpiar el carrito después de crear la orden exitosamente
            const clearCartResponse = await fetch('https://miportalnetcore.onrender.com/Cart/Clear', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ WebId: webId }),
            });

            if (clearCartResponse.ok) {
                toast.success("Carrito limpiado con éxito");
                navigate('/');
            } else {
                toast.error("Error al limpiar el carrito");
            }
        } else {
            toast.error("Error al crear la orden");
        }
    };

    return (
        <>
            <Header />
            <div className="confirmar-pago-container">
                <h1>Confirmar Método de Pago</h1>
                <div className="metodos-pago">
                    <div>
                        <input
                            type="radio"
                            id="tarjeta"
                            name="metodoPago"
                            value="tarjeta"
                            checked={metodoPago === 'tarjeta'}
                            onChange={() => setMetodoPago('tarjeta')}
                        />
                        <label htmlFor="tarjeta">Tarjeta de Crédito</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="contraentrega"
                            name="metodoPago"
                            value="contraentrega"
                            checked={metodoPago === 'contraentrega'}
                            onChange={() => setMetodoPago('contraentrega')}
                        />
                        <label htmlFor="contraentrega">Contra Entrega</label>
                    </div>
                </div>

                {metodoPago === 'tarjeta' && (
                    <div className="tarjeta-formulario">
                        <div className="formulario">
                            <div className="form-group">
                                <label htmlFor="nombrePropietario">Nombre del Propietario</label>
                                <input
                                    type="text"
                                    id="nombrePropietario"
                                    name="nombrePropietario"
                                    value={cardDetails.nombrePropietario}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    id="numeroTarjeta"
                                    name="numeroTarjeta"
                                    value={cardDetails.numeroTarjeta}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaExpiracion">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    id="fechaExpiracion"
                                    name="fechaExpiracion"
                                    value={cardDetails.fechaExpiracion}
                                    onChange={handleFechaExpiracionChange}
                                    maxLength={5} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCvvChange}
                                    maxLength={3} 
                                />
                            </div>
                        </div>
                        <div className="tarjeta-visual">
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <p className="heading_8264">MASTERCARD</p>
                                        <svg className="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                                            <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                                            <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                                            <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48C20.376,15.05,18,19.245,18,24z"></path>
                                            </svg>
                                            <svg version="1.1" className="chip" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <image id="image0" width="50" height="50" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
                                                fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
                                                ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
                                                e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
                                                ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
                                                u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
                                                fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
                                                lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
                                                tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
                                                g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
                                                /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
                                                orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
                                                GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
                                                OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
                                                I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
                                                lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
                                                JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
                                                qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
                                                1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
                                                BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
                                                amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
                                                S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
                                                cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                                                MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
                                                LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="></image>
                                        </svg>
                                        <svg version="1.1" className="contactless" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <image id="image0" width="50" height="50" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                                                cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
                                                lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
                                                fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
                                                GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
                                                VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
                                                HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
                                                bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
                                                DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
                                                qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
                                                sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
                                                Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
                                                XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
                                                cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
                                                nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
                                                xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
                                                MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
                                                OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
                                                MDowMIXeN6gAAAAASUVORK5CYII="></image>
                                        </svg>
                                        <p className="number">{cardDetails.numeroTarjeta || '**** **** **** ****'}</p>
                                        <p className="valid_thru">VALID THRU</p>
                                        <p className="date_8264">{cardDetails.fechaExpiracion || '**/**'}</p>
                                        <p className="name">{cardDetails.nombrePropietario || 'NOMBRE'}</p>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="strip"></div>
                                        <div className="mstrip"></div>
                                        <div className="sstrip">
                                            <p className="code">{cardDetails.cvv || '***'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`custom-container confirmar-compra-button ${!metodoPago ? 'disabled' : ''}`} onClick={() => metodoPago && handleConfirmarCompra()}>
  <div className="custom-left-side">
    <div className="custom-card">
      <div className="custom-card-line"></div>
      <div className="custom-buttons"></div>
    </div>
    <div className="custom-post">
      <div className="custom-post-line"></div>
      <div className="custom-screen">
        <div className="custom-dollar">$</div>
      </div>
      <div className="custom-numbers"></div>
      <div className="custom-numbers-line2"></div>
    </div>
  </div>
  <div className="custom-right-side">
    <div className="custom-new">Confirmar Pago</div>
    <svg viewBox="0 0 451.846 451.847" height="512" width="512" xmlns="http://www.w3.org/2000/svg" className="custom-arrow">
      <path fill="#cfcfcf" d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"></path>
    </svg>
  </div>
</div>
            </div>
            <Toaster />
            <Footer />
        </>
    );
};

export default ConfirmarPago;
