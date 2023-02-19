import ControlGastos from "./ControlGastos";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  gastos,
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  setGastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlGastos
          presupuesto={presupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setIsValidPresupuesto={setIsValidPresupuesto}
          setPresupuesto={setPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
