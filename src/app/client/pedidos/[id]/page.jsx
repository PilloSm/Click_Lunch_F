import TablaPedidos from "@/components/tablaPedidos";

export default function ({ params }) {
  return <TablaPedidos id_cuenta={params.id} />;
}
