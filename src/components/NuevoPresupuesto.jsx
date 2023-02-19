import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar presupuesto
        if(!presupuesto || presupuesto <= 0){
            setMensaje("Presupuesto no válido");
            return;
        }

        setMensaje("");
        setIsValidPresupuesto(true);
    }

  return (
    <div className="contenedor contenedor-presupuesto sombra">
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="presupuesto">Definir presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            id="presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />

          <input type="submit" value="Añadir" />

          {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
