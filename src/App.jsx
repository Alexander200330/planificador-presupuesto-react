import { useEffect, useState } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import iconoNuevoGasto from "./img/nuevo-gasto.svg";
import { generarId } from "./utilities";

function App() {
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [editarGasto]);

  // Guardar presupuesto en el localstorage
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuesto = Number(localStorage.getItem("presupuesto") ?? 0);

    if (presupuesto > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  // Guardar gastos en el localstorage
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  // Filtrar
  useEffect(() => {
    if(filtro){
      const arrayFiltrado = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
  
      setGastosFiltrados(arrayFiltrado)
    }
  },[filtro])



  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGasto({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const handleEliminar = (id) => {
    const arrayNuevo = gastos.filter((gasto) => gasto.id !== id);
    setGastos(arrayNuevo);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Editar
      const arrayEditado = gastos.map((item) =>
        item.id === gasto.id ? gasto : item
      );
      setGastos(arrayEditado);
    } else {
      //Agregar
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setEditarGasto={setEditarGasto}
              handleEliminar={handleEliminar}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={iconoNuevoGasto}
              alt="Boton nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          editarGasto={editarGasto}
        />
      )}
    </div>
  );
}

export default App;
