
/**************************************************************   Código sin optimizar   **********************************************************************

import { useState, useRef } from "react";

function App() {
  const [anchoBarra, setAnchoBarra] = useState(1);
  const [rotacion, setRotation] = useState(0);
  const [premio, setPremio] = useState(
    "HAZ CLIC EN TIRAR PARA EMPEZAR A JUGAR."
  );
  const [monedas, setMonedas] = useState(2);
  const [tiradas, setTiradas] = useState(2);
  const [situacion, setSituacion] = useState(0);
  const barraRef = useRef(null);
  const invisibleRef = useRef(null);
  const gameOverRef = useRef(null);
  const gameOver2Ref = useRef(null);
  const tirarRef = useRef(null);
  const empezar = () => {
    if (barraRef.current) {
      barraRef.current.classList.toggle("parado");
      const ancho = barraRef.current.getBoundingClientRect().width;
      setAnchoBarra(ancho);
      invisibleRef.current.classList.toggle("invisible");
      setMonedas(monedas - 1);
      setTiradas(tiradas - 1);
      setSituacion(1);
      girar();
    }
  };
  const girar = () => {
    const rotacionRandom = Math.floor(Math.random() * 210) + 340;
    setRotation(rotacion + rotacionRandom + anchoBarra);
  };

  const final = () => {
    setSituacion(0);
    invisibleRef.current.classList.toggle("invisible");
    const grados = ((rotacion % 360) + 360) % 360;
    if ((grados >= 0 && grados <= 44) || (grados >= 180 && grados <= 224)) {
      setPremio("HAS PERDIDO TODO TU DINERO");
      gameOverRef.current.classList.toggle("finPartida");
      gameOver2Ref.current.classList.toggle("finPartida");
      setMonedas(0);
      setTiradas(0);
      setSituacion(2);
      tirarRef.current.classList.toggle("finPartida");
    } else if (grados >= 45 && grados <= 90) {
      setPremio("GANAS UNA MONEDA Y SIGUES TIRANDO");
      setMonedas(monedas + 1);
      setTiradas(tiradas + 1);
    } else if (grados >= 91 && grados <= 135) {
      setPremio(`ENHORABUENA HAS GANADO ${monedas * 2} MONEDAS`);
      setMonedas(monedas * 2);
      gameOverRef.current.classList.toggle("finPartida");
      gameOver2Ref.current.classList.toggle("finPartida");
      tirarRef.current.classList.toggle("finPartida");
      setSituacion(2);
    } else if (grados >= 136 && grados <= 179) {
      setPremio("GANAS 8 MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 8);
      setTiradas(tiradas + 1);
    } else if (grados >= 225 && grados <= 269) {
      setPremio("GANAS 5 MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 5);
      setTiradas(tiradas + 1);
    } else if (grados >= 270 && grados <= 314) {
      setPremio(`ENHORABUENA HAS GANADO ${monedas * 3} MONEDAS`);
      setMonedas(monedas * 3);
      gameOverRef.current.classList.toggle("finPartida");
      gameOver2Ref.current.classList.toggle("finPartida");
      tirarRef.current.classList.toggle("finPartida");
      setSituacion(2);
    } else if (grados >= 315 && grados <= 359) {
      setPremio("GANAS DOS MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 2);
      setTiradas(tiradas + 1);
    }
  };
  const empezarDenuevo = () => {
    tirarRef.current.classList.toggle("finPartida");
    gameOverRef.current.classList.toggle("finPartida");
    gameOver2Ref.current.classList.toggle("finPartida");
    setMonedas(2);
    setTiradas(2);
    setSituacion(0);
  };
  return (
    <>
      <h1 className="titulo">LA RULETA DE LA SUERTE</h1>
      <div className="monedas" ref={gameOverRef}>
        <h2 className="cartera">MONEDAS</h2>
        {Array.from({ length: monedas }, (_, index) => (
          <img key={index} src="./assets/moneda.png" alt="moneda" />
        ))}
      </div>
      <div className="tiradas" ref={gameOver2Ref}>
        <h2 className="ticket">TIRADAS</h2>
        {Array.from({ length: tiradas }, (_, index) => (
          <img key={index} src="./assets/ticket.png" alt="ticket" />
        ))}
      </div>

      <div className="contenedor">
        <div
          className="ruleta"
          style={{
            backgroundImage: `url('./assets/ruleta.png')`,
            transform: `rotate(${rotacion}deg`,
            transition: "transform 3s cubic-bezier(0.3,0.7,0.8,0.99)",
          }}
          onTransitionEnd={final}
        ></div>

        <div className="premio" ref={invisibleRef}>
          {premio}
        </div>

        {situacion === 0 && (
          <div className="barra">
            <div className="barra_int" ref={barraRef}></div>
          </div>
        )}
        <div className="barraInferior">
          {tiradas >= 0 && (
            <button className="empezar" ref={tirarRef} onClick={empezar}>
              TIRAR
            </button>
          )}
        </div>
        {situacion === 2 && (
          <div className="jugarDenuevo">
            <button className="btnEmpezarDenuevo" onClick={empezarDenuevo}>VOLVER A JUGAR</button>
          </div>
        )}

        <div className="central">
          <img src="./assets/central.png" alt="flecha central" />
        </div>
      </div>
    </>
  );
}

export default App;
*/


/**********************************************************************    Código optimizado    ***********************************************************************/

import { useState, useRef, useCallback } from "react";
import audio from "../public/assets/spin.mp3";

function App() {
  const [anchoBarra, setAnchoBarra] = useState(1);
  const [rotacion, setRotacion] = useState(0);
  const [premio, setPremio] = useState("HAZ CLIC EN TIRAR PARA EMPEZAR A JUGAR.");
  const [monedas, setMonedas] = useState(2);
  const [tiradas, setTiradas] = useState(2);
  const [situacion, setSituacion] = useState(0);
const audioRuleta = audio;
  const barraRef = useRef(null);
  const invisibleRef = useRef(null);
  const gameOverRef = useRef(null);
  const gameOver2Ref = useRef(null);
  const tirarRef = useRef(null);
  const toggleClass = useCallback((ref, className) => {
    ref.current?.classList.toggle(className);
  }, []);

  const empezar = useCallback(() => {
    if (!barraRef.current) return;
    
    toggleClass(barraRef, "parado");
    setAnchoBarra(barraRef.current.getBoundingClientRect().width);
    toggleClass(invisibleRef, "invisible");
    
    setMonedas((prev) => prev - 1);
    setTiradas((prev) => prev - 1);
    setSituacion(1);
    girar();
audioRuleta.play();
  }, [toggleClass]);

  const girar = useCallback(() => {
    const rotacionRandom = Math.floor(Math.random() * 210) + 340;
    setRotacion((prevRotacion) => prevRotacion + rotacionRandom + anchoBarra);
  }, [anchoBarra]);

  const final = useCallback(() => {
    setSituacion(0);
    toggleClass(invisibleRef, "invisible");

    const grados = ((rotacion % 360) + 360) % 360;

    const premios = [
      { rango: [0, 44], mensaje: "HAS PERDIDO TODO TU DINERO", monedas: 0, fin: true },
      { rango: [45, 90], mensaje: "GANAS UNA MONEDA Y SIGUES TIRANDO", monedas: 1 },
      { rango: [91, 135], mensaje: `ENHORABUENA HAS GANADO ${monedas * 2} MONEDAS`, monedas: monedas * 2, fin: true },
      { rango: [136, 179], mensaje: "GANAS 8 MONEDAS Y SIGUES TIRANDO", monedas: 8 },
      { rango: [180, 224], mensaje: "HAS PERDIDO TODO TU DINERO", monedas: 0, fin: true },
      { rango: [225, 269], mensaje: "GANAS 5 MONEDAS Y SIGUES TIRANDO", monedas: 5 },
      { rango: [270, 314], mensaje: `ENHORABUENA HAS GANADO ${monedas * 3} MONEDAS`, monedas: monedas * 3, fin: true },
      { rango: [315, 359], mensaje: "GANAS DOS MONEDAS Y SIGUES TIRANDO", monedas: 2 },
    ];

    const premioActual = premios.find(({ rango }) => grados >= rango[0] && grados <= rango[1]);

    if (premioActual) {
      setPremio(premioActual.mensaje);
      setMonedas((prev) => premioActual.fin ? premioActual.monedas : prev + premioActual.monedas);
      
      if (premioActual.fin) {
        toggleClass(gameOverRef, "finPartida");
        toggleClass(gameOver2Ref, "finPartida");
        toggleClass(tirarRef, "finPartida");
        setSituacion(2);
        setTiradas(0);
      } else {
        setTiradas((prev) => prev + 1);
      }
    }
  }, [rotacion, monedas, toggleClass]);

  const empezarDenuevo = useCallback(() => {
    toggleClass(tirarRef, "finPartida");
    toggleClass(gameOverRef, "finPartida");
    toggleClass(gameOver2Ref, "finPartida");

    setMonedas(2);
    setTiradas(2);
    setSituacion(0);
  }, [toggleClass]);

  return (
    <>
      <h1 className="titulo">LA RULETA DE LA SUERTE</h1>
      <div className="monedas" ref={gameOverRef}>
        <h2 className="cartera">MONEDAS</h2>
        {Array.from({ length: monedas }).map((_, index) => (
          <img key={index} src="./assets/moneda.png" alt="moneda" />
        ))}
      </div>
      <div className="tiradas" ref={gameOver2Ref}>
        <h2 className="ticket">TIRADAS</h2>
        {Array.from({ length: tiradas }).map((_, index) => (
          <img key={index} src="./assets/ticket.png" alt="ticket" />
        ))}
      </div>

      <div className="contenedor">
        <div
          className="ruleta"
          style={{
            backgroundImage: `url('./assets/ruleta.png')`,
            transform: `rotate(${rotacion}deg)`,
            transition: "transform 3s cubic-bezier(0.3,0.7,0.8,0.99)",
          }}
          onTransitionEnd={final}
        ></div>

        <div className="premio" ref={invisibleRef}>
          {premio}
        </div>

        {situacion === 0 && (
          <div className="barra">
            <div className="barra_int" ref={barraRef}></div>
          </div>
        )}

        <div className="barraInferior">
          {tiradas >= 0 && (
            <button className="empezar" ref={tirarRef} onClick={empezar}>
              TIRAR
            </button>
          )}
        </div>

        {situacion === 2 && (
          <div className="jugarDenuevo">
            <button className="btnEmpezarDenuevo" onClick={empezarDenuevo}>
              VOLVER A JUGAR
            </button>
          </div>
        )}

        <div className="central">
          <img src="./assets/central.png" alt="flecha central" />
        </div>
      </div>
    </>
  );
}

export default App;
