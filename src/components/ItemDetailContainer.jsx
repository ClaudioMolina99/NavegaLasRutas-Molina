// src/components/ItemDetailContainer.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { PRODUCTS } from "../data/products";

// Promise con retardo para simular fetch
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
async function fetchProductById(id) {
  await delay(500);
  return PRODUCTS.find((p) => String(p.id) === String(id)) || null;
}

export default function ItemDetailContainer() {
  const { id } = useParams(); // lee /item/:id
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchProductById(id)
      .then((prod) => {
        if (alive) setItem(prod);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]); // importante: dependencia del parámetro de URL

  if (loading) {
    return (
      <section style={{ padding: 16 }}>
        <p>Cargando detalle...</p>
      </section>
    );
  }

  if (!item) {
    return (
      <section style={{ padding: 16 }}>
        <p>Producto no encontrado.</p>
      </section>
    );
  }

  return <ItemDetail item={item} />;
}
