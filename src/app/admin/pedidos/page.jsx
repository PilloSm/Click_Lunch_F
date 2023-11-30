import CardPedidos from "@/components/CardPedidos";
import axios from "axios";

async function Pedidos() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const fetchData = async () => {
    try {
      const res1 = await axios.get(
        `http://localhost/3000/api/apiCafeteria/pedidos/2`
      );
      const res2 = await axios.get(
        `http://localhost/3000/api/apiCafeteria/pedidos/3`
      );
      const res3 = await axios.get(
        `http://localhost/3000/api/apiCafeteria/pedidos/4`
      );
      const res4 = await axios.get(
        `http://localhost/3000/api/apiCafeteria/pedidos/5`
      );

      setData1(res1.data);
      setData2(res2.data);
      setData3(res3.data);
      setData4(res4.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="w-[1440px] h-full flex flex-wrap justify-around bg-white relative">
        <div className="absolute top-[62px] left-[582px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal">
          Pedidos
        </div>
        <div className="absolute w-[431px] top-[202px] left-[572px] font-nunito font-normal text-black text-[60px] text-center leading-normal tracking-normal"></div>
        <div className="top-[20px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {data1.data.map((detalle) => (
            <CardPedidos
              key={detalle.id_pedido} // Agrega una clave única para cada elemento en el array
              id_pedido={detalle.id_pedido}
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
              estado_actual_nombre={detalle.estado_actual_nombre}
              estado_actual_id={detalle.estado_actual_id}
            />
          ))}
        </div>
        <div className="absolute w-[431px] top-[820px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-30px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {data2.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} 
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>

        <div className="absolute w-[431px] top-[1420px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {data3.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} 
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>

        <div className="absolute w-[431px] top-[2120px] left-[570px] font-nunito font-normal text-black text-[64px] text-center leading-normal tracking-normal"></div>

        <div className="top-[-50px] relative w-[6000px] h-[480px] flex flex-nowrap overflow-scroll justify-start overflow-x-scroll overflow-y-hidden">
          {data4.data.map((detalle) => {
            <CardPedidos
              key={detalle.id_pedido} 
              nombres_comidas={detalle.nombres_comidas}
              cantidades_detalles={detalle.cantidades_detalles}
              id_cuenta={detalle.id_cuenta}
              estado_siguiente_nombre={detalle.estado_siguiente_nombre}
            />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;
