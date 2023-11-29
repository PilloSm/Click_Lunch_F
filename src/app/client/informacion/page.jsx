import InformacionCliente from "@/components/informacion";
import Tablass from "@/components/paraTabla";
import TablaPedidos from "@/components/tablaPedidos";
export default function Informacion(request) {
  const { searchParams } = request;
  
  return (
    <div className="bg-white flex flex-row justify-center w-full h-[1000px]">

    <div className="absolute top-[400px] left-[1700px] w-80 h-80 rounded-full bg-[#3AAA9C] z-10">
    </div>
      <InformacionCliente borrarCarrito={searchParams.borrar} />
    </div>
  );
}
