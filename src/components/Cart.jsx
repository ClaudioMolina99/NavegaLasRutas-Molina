import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setQty, remove, clear, total } = useCart();

  if (cart.length === 0) {
    return (
      <section style={{ marginTop: 16, padding: 16 }}>
        <h3>Carrito</h3>
        <p>Tu carrito está vacío.</p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 16, padding: 16 }}>
      <h3>Carrito</h3>
      <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{item.title}</div>
              <div style={{ opacity: 0.7 }}>${item.price}</div>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              Cant:
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => setQty(item.id, Number(e.target.value))}
                style={{ width: 64, padding: "4px 6px" }}
              />
            </label>

            <button onClick={() => remove(item.id)} style={{ color: "#c0392b" }}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={clear}>Vaciar carrito</button>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Total: ${total}</div>
      </div>
    </section>
  );
}
