import { object } from "prop-types";
import { useEffect, useState } from "react";
import IconoCerrar from "../img/cerrar.svg";
import { generarId } from "../utilities";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, editarGasto }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(()=>{
    if(Object.keys(editarGasto).length > 0){
      setNombre(editarGasto.nombre)
      setCantidad(editarGasto.cantidad)
      setCategoria(editarGasto.categoria)
      setId(editarGasto.id)
      setFecha(editarGasto.fecha)
    }
  }, [editarGasto])

  function handleHiddenModal() {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("" || 0)) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
      }, 3000);

      return;
    }

    guardarGasto({ nombre, cantidad, categoria, id, fecha });

    handleHiddenModal()
    setNombre("");
    setCantidad(0);
    setCategoria("");

  };

  return (
    <div className="modal">
      <img
        src={IconoCerrar}
        alt="Cerrar modal"
        className="cerrar-modal"
        onClick={handleHiddenModal}
      />

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
        <legend>{Object.keys(editarGasto).length > 0 ? "Editar gasto" : "Nuevo gasto"}</legend>

        <div className="campo">
          <label htmlFor="nombre">Nombre gasto</label>
          <input
            type="text"
            placeholder="Añade nombre del gasto"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="Añade cantidad del gasto, ej. 300"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Selecione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={Object.keys(editarGasto).length > 0 ? "Guardar cambios" : "Añadir gasto"} />
      </form>
    </div>
  );
};

export default Modal;
