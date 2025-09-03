// src/components/ItemCount.jsx
import { useState } from "react";

export default function ItemCount({ stock = 0, initial = 1, onAdd }) {
  // Normalizamos el initial dentro de [1, stock] (si hay stock)
  const safeInitial = Math.min(Math.max(initial, 1), stock || 1);
  const [qty, setQty] = useState(safeInitial);

  const inc = () => setQty((q) => (stock ? Math.min(stock, q + 1) : q));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const onChange = (e) => {
    const v = Number(e.target.value);
    if (Number.isNaN(v)) return;
    if (!stock) return setQty(1);
    setQty(Math.min(stock, Math.max(1, v)));
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") onAdd(qty);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
      <button onClick={dec} disabled={qty <= 1} style={{ width: 32, height: 32 }}>-</button>

      <input
        type="number"
        min={1}
        max={stock || 1}
        value={qty}
        onChange={onChange}
        style={{ width: 64, padding: "4px 6px" }}
      />

      <button
        onClick={inc}
        disabled={stock ? qty >= stock : true}
        style={{ width: 32, height: 32 }}
      >
        +
      </button>

      <button
        onClick={handleAdd}
        disabled={stock === 0}
        style={{ marginLeft: 8, padding: "8px 12px", borderRadius: 6, cursor: stock === 0 ? "not-allowed" : "pointer" }}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
