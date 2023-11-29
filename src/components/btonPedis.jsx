import axios from "axios";
import Link from "next/link";
export default function BtonPedir({ carrito, id_cuenta, saldo }) {
  const datos = { ...carrito, id_cuenta };
  const handleSubmit = async () => {
    if (datos.total <= saldo) {
      const res = await axios.post(
        "http://localhost:3000/api/apiCliente/pedido",
        datos
      );
      if (res.error) return console.log(error);
    } else {
      alert("No tienes suficiente dinero <3");
    }
  };
  return (
    <Link href={"/client/informacion?borrar=si"}>
    <button
      onClick={handleSubmit}
      className="absolute w-full sm:w-[360px] md:w-[528px] lg:w-[528px] h-[90px] top-[759px] left-[50%] transform translate-x-[-50%] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
    >
      <div className="absolute w-full h-[20px] top-[35px] left-[50%] transform translate-x-[-50%] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
        Pedir
      </div>
    </button>
  </Link>
  );
}
