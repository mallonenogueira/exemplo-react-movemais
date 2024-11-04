/* eslint-disable react/prop-types */

import { useState } from "react";
import "./App.css";

const ENTER_KEY = "Enter";

function maskOnlyAZ(value) {
  return value.replace(/[^a-zA-ZÇç]/g, "");
}

function Input({ value, onChange, disabled, onKeyUp }) {
  return (
    <input
      className="input"
      maxLength={1}
      value={value}
      onChange={onChange}
      disabled={disabled}
      onKeyUp={onKeyUp}
    />
  );
}

function Titulo({ texto }) {
  return <h1>{texto}</h1>;
}

function App() {
  const [linhas, setLinhas] = useState([
    {
      valorDalinha: ["A", "B", "C", "D", "E"],
    },
    {
      valorDalinha: ["", "", "", "", ""],
      desabilitar: true,
    },
    {
      valorDalinha: ["", "", "", "", ""],
      desabilitar: true,
    },
    {
      valorDalinha: ["", "", "", "", ""],
      desabilitar: true,
    },
  ]);

  return (
    <div className="app">
      <Titulo texto="Letreco" />

      {/* <Titulo texto="Configurações" /> */}

      {linhas.map((linha, indexLinha) => (
        <div key={indexLinha} className="linha">
          {[...linha.valorDalinha].map((valor, indexColuna) => (
            <Input
              key={indexColuna}
              value={valor}
              disabled={linha.desabilitar}
              onKeyUp={(e) => {
                if (e.key === ENTER_KEY) {
                  // linha[indexLinha + 1].desabilitar = false;

                  setLinhas(
                    linhas.map((linha, indexDaLinhaAlterada) => {
                      if (indexDaLinhaAlterada === indexLinha + 1) {
                        linha.desabilitar = false;
                      }

                      return linha;
                    })
                  );
                }
              }}
              onChange={(e) => {
                setLinhas(
                  linhas.map((linha, indexDaLinhaAlterada) => {
                    if (indexDaLinhaAlterada === indexLinha) {
                      linha.valorDalinha[indexColuna] = maskOnlyAZ(
                        e.target.value
                      );
                    }

                    return linha;
                  })
                );
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

