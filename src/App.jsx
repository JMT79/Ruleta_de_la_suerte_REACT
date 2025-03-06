import { useState, useRef } from "react";
import useSound from "use-sound";
import sonidoRuleta from "/assets/spin.mp3";
import sonidoMuerte from "/assets/muerte.mp3";
import sonidoGanador from "/assets/win.mp3";
import sonidoMonedas from "/assets/moneda.mp3";
function App() {
  const [sonidoGiro] = useSound(sonidoRuleta);
  const [sonidoFinal] = useSound(sonidoMuerte);
  const [sonidoGanar] = useSound(sonidoGanador);
  const [sonidoMoneda] = useSound(sonidoMonedas);
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
      sonidoGiro();
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
      sonidoFinal();
    } else if (grados >= 45 && grados <= 90) {
      setPremio("GANAS UNA MONEDA Y SIGUES TIRANDO");
      setMonedas(monedas + 1);
      setTiradas(tiradas + 1);
      sonidoMoneda();
    } else if (grados >= 91 && grados <= 135) {
      setPremio(`ENHORABUENA HAS GANADO ${monedas * 2} MONEDAS`);
      setMonedas(monedas * 2);
      gameOverRef.current.classList.toggle("finPartida");
      gameOver2Ref.current.classList.toggle("finPartida");
      tirarRef.current.classList.toggle("finPartida");
      setSituacion(2);
      sonidoGanar();
    } else if (grados >= 136 && grados <= 179) {
      setPremio("GANAS 8 MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 8);
      setTiradas(tiradas + 1);
      sonidoMoneda();
    } else if (grados >= 225 && grados <= 269) {
      setPremio("GANAS 5 MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 5);
      setTiradas(tiradas + 1);
      sonidoMoneda();
    } else if (grados >= 270 && grados <= 314) {
      setPremio(`ENHORABUENA HAS GANADO ${monedas * 3} MONEDAS`);
      setMonedas(monedas * 3);
      sonidoGanar();
      gameOverRef.current.classList.toggle("finPartida");
      gameOver2Ref.current.classList.toggle("finPartida");
      tirarRef.current.classList.toggle("finPartida");
      setSituacion(2);
    } else if (grados >= 315 && grados <= 359) {
      setPremio("GANAS DOS MONEDAS Y SIGUES TIRANDO");
      setMonedas(monedas + 2);
      setTiradas(tiradas + 1);
      sonidoMoneda();
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
            transition: "transform 4s cubic-bezier(0.3,0.7,0.8,0.99)",
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

