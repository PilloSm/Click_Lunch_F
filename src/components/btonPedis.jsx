import axios from "axios";
import Link from "next/link";
export default function BtonPedir({ carrito, id_cuenta, saldo }) {
  const datos = { ...carrito, id_cuenta };
  var error;
  const handleSubmit = async () => {
    if (datos.total <= saldo) {
      const res = await axios.post(
        "http://localhost:3000/api/apiCliente/pedido",
        datos
      );
      if (res.error) return console.log(error);
    } else {
      error = "fjasd";
      alert("No tienes suficiente dinero <3");
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <Link
      href={
        error ? "/client/carrito" : "/client/informacion?borrar=si"
      }
    >
      <button
        onClick={handleSubmit}
        className="absolute w-[528px] h-[95px] top-[759px] left-[426px] bg-[#25a18ee6] rounded-full border-none cursor-pointer"
      >
        <div className="absolute w-[523px] h-[20px] top-[37px] left-[0px] font-poppins-bold text-[white] text-[32px] text-center leading-[20px]">
          Pedir
        </div>
      </button>
    </Link>
>>>>>>> 70f0d9df9a13152fb66ad3db304fbdb9cb1eeac0
  );
}
