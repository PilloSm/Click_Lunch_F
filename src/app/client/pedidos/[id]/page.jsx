import TablaPedidos from "@/components/tablaPedidos";
import ValUsu from "@/components/validarUsu";

export default function ({ params }) {
  return <TablaPedidos id_cuenta={params.id} />;
}
