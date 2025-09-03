import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clear } = useCart();
  const [orderId, setOrderId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (cart.length === 0) return;

    const order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      buyer: data,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("lastOrder", JSON.stringify(order));
    } catch {}

    setOrderId(order.id);
    clear();
    reset();
  };

  if (orderId) {
    return (
      <section style={{ padding: 16, marginTop: 16, borderTop: "1px solid #eee" }}>
        <h3>¡Gracias por tu compra!</h3>
        <p>Tu número de pedido es <b>{orderId}</b>.</p>
        <p>Guardamos el comprobante en tu navegador (localStorage: <i>lastOrder</i>).</p>
      </section>
    );
  }

  return (
    <section style={{ padding: 16, marginTop: 16, borderTop: "1px solid #eee" }}>
      <h3>Checkout</h3>
      {cart.length === 0 && <p style={{ color: "#c0392b" }}>Tu carrito está vacío.</p>}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Nombre y apellido
          <input
            type="text"
            placeholder="Ej: Claudio Molina"
            {...register("name", { required: "Este campo es obligatorio" })}
          />
          {errors.name && <span style={{ color: "#c0392b" }}>{errors.name.message}</span>}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            type="email"
            placeholder="tu@email.com"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
            })}
          />
          {errors.email && <span style={{ color: "#c0392b" }}>{errors.email.message}</span>}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Dirección
          <input
            type="text"
            placeholder="Calle 123, Piso/Depto"
            {...register("address", { required: "Este campo es obligatorio" })}
          />
          {errors.address && <span style={{ color: "#c0392b" }}>{errors.address.message}</span>}
        </label>

        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          style={{ padding: "10px 14px", borderRadius: 6, cursor: "pointer" }}
        >
          Finalizar compra {total > 0 ? `— $${total}` : ""}
        </button>
      </form>
    </section>
  );
}
