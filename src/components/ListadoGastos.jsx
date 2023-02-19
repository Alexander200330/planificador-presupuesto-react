import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setEditarGasto,
  handleEliminar,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      <>
        {filtro.length ? (
          <>
            {gastosFiltrados.length > 0 ? (
              <h2>Gastos</h2>
            ) : (
              <h2>No hay gastos de esta categoría</h2>
            )}
            {gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                handleEliminar={handleEliminar}
              />
            ))}
          </>
        ) : (
          <>
            {gastos.length > 0 ? (
              <h2>Gastos</h2>
            ) : (
              <h2>No hay gastos</h2>
            )}

            {gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setEditarGasto={setEditarGasto}
                handleEliminar={handleEliminar}
              />
            ))}
          </>
        )}
      </>
    </div>
  );
};

export default ListadoGastos;
