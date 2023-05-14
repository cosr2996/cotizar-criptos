import { useState, useEffect } from "react";
import "./App.css";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import { Formulario } from "./components/Formulario";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0px auto;
  width: 90%;
  margin-top: 100px;
  @media (min-width: 992px) {
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

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        console.log(resultado.DISPLAY[criptomoneda][moneda])
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
      </div>
    </Contenedor>
  );
}

export default App;
