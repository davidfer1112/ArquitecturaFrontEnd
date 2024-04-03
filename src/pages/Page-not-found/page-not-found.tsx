// import React from 'react'

import './page-not-found.css';

function Error404() {
  return (
    <div className="fondo">
      <div className="top">
        <h1>404</h1>
        <h3>Pagina no encontrada</h3>
      </div>
      <div className="container">
        <div className="fantasma-copia">
          <div className="uno"></div>
          <div className="dos"></div>
          <div className="tres"></div>
          <div className="cuatro"></div>
        </div>
        <div className="fantasma">
          <div className="cara">
            <div className="ojo"></div>
            <div className="ojo-derecho"></div>
            <div className="boca"></div>
          </div>
        </div>
        <div className="sombra"></div>
      </div>
      <div className="boton">
        <p>¡Oh no! Parece que este fantasma asustó a la página que estabas buscando.</p>
        <div className="botones">
          <button className="btn">Atras</button>
          <button className="btn">Welcome</button>
        </div>
      </div>
    </div>
  )
}

export default Error404