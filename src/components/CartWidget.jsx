import { useCart } from "../context/CartContext";

function CartWidget() {
  const { count } = useCart();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span role="img" aria-label="carrito" style={{ fontSize: 22 }}>
        🛒
      </span>
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            minWidth: 18,
            height: 18,
            padding: "0 4px",
            borderRadius: 9,
            background: "black",
            color: "white",
            fontSize: 12,
            lineHeight: "18px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export default CartWidget;
