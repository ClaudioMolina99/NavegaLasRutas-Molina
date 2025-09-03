// src/components/ItemDetail.jsx
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

export default function ItemDetail({ item }) {
  const { add } = useCart();

  const handleAdd = (qty) => {
    add(item, qty);
    // 👋 sacamos el alert, ahora simplemente se agrega al carrito
  };

  return (
    <section
      style={{
        padding: 16,
        display: "grid",
        gap: 16,
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/600?text=Imagen";
        }}
        style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
      />
      <div>
        <h2 style={{ marginTop: 0 }}>{item.title}</h2>
        <p style={{ opacity: 0.8 }}>Categoría: {item.category}</p>
        <h3 style={{ margin: "8px 0" }}>${item.price}</h3>

        {/* Contador con onAdd que suma al carrito */}
        <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
      </div>
    </section>
  );
}
