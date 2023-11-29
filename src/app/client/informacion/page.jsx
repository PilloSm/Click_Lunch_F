import InformacionCliente from "@/components/informacion";
import Tablass from "@/components/paraTabla";
import TablaPedidos from "@/components/tablaPedidos";
export default function Informacion(request) {
  const { searchParams } = request;
  
  return (
    <div className="bg-white flex flex-row justify-center w-full h-[1000px]">    
      <InformacionCliente borrarCarrito={searchParams.borrar} />
    </div>
  );
}
