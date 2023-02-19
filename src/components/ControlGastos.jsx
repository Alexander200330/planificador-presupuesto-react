import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlGastos = ({
  presupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto,
  setPresupuesto,
}) => {
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetear = () => {
    const resultado = confirm("¿Deseas reiniciar la aplicación?");

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    // cálculo de porcentaje

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#f5f5f5",
            pathTransitionDuration: 0.5,
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleResetear}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlGastos;
