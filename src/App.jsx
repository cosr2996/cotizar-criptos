import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import { Formulario } from "./components/Formulario";
import {Resultado} from "./components/Resultado";
import { Spinner } from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0px auto;
  width: 90%;
  margin-bottom: 20px;
  
  @media (min-width: 992px) {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  display: block;
  margin: 100px auto 0 auto;
  @media (max-width: 600px) {
    margin: 20px auto 0 auto;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", san-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      };
      cotizarCripto()
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptomonedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando&& <Spinner>CCargando...</Spinner>}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  );
}

export default App;
