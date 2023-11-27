import InformacionCliente from "@/components/informacion";
import Tablass from "@/components/paraTabla";
import TablaPedidos from "@/components/tablaPedidos";
export default function Informacion(request) {
  const { searchParams } = request;
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <InformacionCliente borrarCarrito={searchParams.borrar} />
      {/* <TablaPedidos id_cuenta={searchParams.id_cuenta} /> */}
    </div>
  );
}
