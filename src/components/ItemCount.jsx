import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ItemCount({ item, initial = 1 }) {
  const [qty, setQty] = useState(initial);
  const { add } = useCart();

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
      <button onClick={dec} style={{ width: 32, height: 32 }}>-</button>
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        style={{ width: 64, padding: "4px 6px" }}
      />
      <button onClick={inc} style={{ width: 32, height: 32 }}>+</button>

      <button
        onClick={() => add(item, qty)}
        style={{ marginLeft: 8, padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
