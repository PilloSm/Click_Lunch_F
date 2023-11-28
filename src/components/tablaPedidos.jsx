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
    <table className="absolute min-w-full bg-white border border-gray-300 top-[180px]">
  <thead className="bg-[#25a18ee6]">
    <tr>
      <th className="py-2 px-4 border-b">ID Pedido</th>
      <th className="py-2 px-4 border-b">Total</th>
      <th className="py-2 px-4 border-b">Estado</th>
      <th className="py-2 px-4 border-b">Fecha</th>
      <th className="py-2 px-4 border-b">Cantidades Detalles</th>
      <th className="py-2 px-4 border-b">Precios Detalles</th>
      <th className="py-2 px-4 border-b">Nombres Comidas</th>
    </tr>
  </thead>
  <tbody>
    {res.data.map((pedido) => (
      <tr key={pedido.id_pedido}>
        <td className="py-2 px-4 border-b">{pedido.id_pedido}</td>
        <td className="py-2 px-4 border-b">{pedido.total}</td>
        <td className="py-2 px-4 border-b">{pedido.estado_nombre}</td>
        <td className="py-2 px-4 border-b">{pedido.fecha}</td>
        <td className="py-2 px-4 border-b">
          {pedido.cantidades_detalles.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
        <td className="py-2 px-4 border-b">
          {pedido.precios_detalles.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
        <td className="py-2 px-4 border-b">
          {pedido.nombres_comidas.split(",").map((detalle, index) => (
            <div key={index} className="mb-1">{detalle}</div>
          ))}
        </td>
      </tr>
    ))}
  </tbody>
</table>
  );
}