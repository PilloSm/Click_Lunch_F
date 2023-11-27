"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Actualizar() {
  const [comidaN, setComidaN] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    ingredientes: [],
  });

  useEffect(() => {
    axios.get(`/api/apiCafeteria/ingredientes`).then((res) => {
      const { nombre, descripcion, precio, ingredientes } = res.data;
      setComidaN({
        nombre,
        descripcion,
        precio,
        ingredientes,
      });
    });
  }, []); // Añadí un arreglo vacío para que el efecto se ejecute solo una vez al montar el componente

  const handleChangeCantidad = (e) => {
    setComidaN((prevComidaN) => ({
      ...prevComidaN,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <h1>{comidaN.nombre}</h1>
      <p>{comidaN.descripcion}</p>
      <p>Precio: ${comidaN.precio}</p>

      <h2>Ingredientes:</h2>
      {comidaN.ingredientes.map((ingrediente, index) => (
        <div key={index}>
          <p>{ingrediente.nombre}</p>
          <p>Cantidad:</p>
          <input
            type="number"
            name={ingrediente.nombre}
            onChange={handleChangeCantidad}
            placeholder={ingrediente.cantidad}
          />
          <button
            onClick={async () => {
              const encontrado = comidaN.ingredientes.find(
                (item) => item.id_ingrediente === ingrediente.id_ingrediente
              );

              if (encontrado) {
                encontrado.cantidad = comidaN[encontrado.nombre];
                console.log(encontrado);

                const res = await axios.put(
                  `http://localhost:3000/api/apiCafeteria/ingredientes`,
                  { cantidad: encontrado.cantidad, id_ingrediente: encontrado.id_ingrediente }
                );

                setComidaN((prevComidaN) => ({
                  ...prevComidaN,
                  ingredientes: [...prevComidaN.ingredientes],
                }));
              } else {
                alert("</3");
              }
            }}
          >
            Actualizar Cantidad
          </button>
        </div>
      ))}
    </div>
  );
}
