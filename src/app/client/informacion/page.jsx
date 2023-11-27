import InformacionCliente from "@/components/informacion";
export default function Informacion(request) {
  const { searchParams } = request;
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <InformacionCliente borrarCarrito={searchParams.borrar} />
    </div> 
  );
}
