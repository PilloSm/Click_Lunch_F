import TablaPedidos from "@/components/tablaPedidos";

export default function ({ params }) {
  return (<>
  <div className="absolute top-[62px] left-[762px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">
            Historial
  </div>
  <TablaPedidos id_cuenta={params.id} />
  </>)
}
