import axios from "axios";

export default async function TablaPedidos({ id_cuenta }) {
  const res = await axios.get(
    `http://localhost:3000/api/apiCliente/pedido/${id_cuenta}`
  );
  const resultadosTransformados = res.data.map((resultado) => {
    const cantidades = resultado.cantidades_detalles.split(",").map(Number);
    const precios = resultado.precios_detalles.split(",").map(Number);
    const nombresComidas = resultado.nombres_comidas.split(",");
    if (
      cantidades.length === precios.length &&
      precios.length === nombresComidas.length
    ) {
      const idPedido = resultado.id_pedido;

      return cantidades.map((cantidad, index) => ({
        id_pedido: idPedido,
        cantidad,
        precio: precios[index],
        nombre: nombresComidas[index],
      }));
    } else {
      console.error("Las longitudes de los arrays no coinciden.");
      return [];
    }
  });

  return (
    <table>
      <tr>
        <th>ID Pedido</th>
        <th>Total</th>
        <th>Estado</th>
        <th>Fecha</th>
        <th>Cantidades Detalles</th>
        <th>Precios Detalles</th>
        <th>Nombres Comidas</th>
      </tr>
      {res.data.map((pedido) => (
        <tr key={pedido.id_pedido}>
          <td>{pedido.id_pedido}</td>
          <td>{pedido.total}</td>
          <td>{pedido.estado_nombre}</td>
          <td>{pedido.fecha}</td>
          <td>
            {pedido.cantidades_detalles.split(",").map((detalle, index) => (
              <div key={index}>{detalle}</div>
            ))}
          </td>
          <td>
            {pedido.precios_detalles.split(",").map((detalle, index) => (
              <div key={index}>{detalle}</div>
            ))}
          </td>
          <td>
            {pedido.nombres_comidas.split(",").map((detalle, index) => (
              <div key={index}>{detalle}</div>
            ))}
          </td>
        </tr>
      ))}
    </table>
  );
}