import { formatearFecha } from "../utilities";
import iconoAhorro from "../img/icono_ahorro.svg";
import iconoCasa from "../img/icono_casa.svg";
import iconoComida from "../img/icono_comida.svg";
import iconoGastos from "../img/icono_gastos.svg";
import iconoOcio from "../img/icono_ocio.svg";
import iconoSalud from "../img/icono_salud.svg";
import iconoSuscripciones from "../img/icono_suscripciones.svg";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const Gasto = ({ gasto, setEditarGasto, handleEliminar }) => {
  const { nombre, categoria, cantidad, id, fecha } = gasto;

  const iconos = {
    ahorro: iconoAhorro,
    comida: iconoComida,
    casa: iconoCasa,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripciones: iconoSuscripciones,
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditarGasto(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => handleEliminar(id)}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="sombra gasto">
          <div className="contenido-gasto">
            <img src={iconos[categoria]} alt="Icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
