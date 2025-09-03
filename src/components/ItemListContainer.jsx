// src/components/ItemListContainer.jsx
import React, { useMemo, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

// Botón separado que usa el contexto (evita re-render de toda la grilla)
const AddBtn = memo(function AddBtn({ product }) {
  const { add } = useCart();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      add(product, 1);
    },
    [add, product]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
    >
      Agregar al carrito
    </button>
  );
});

// Grilla memoizada (no depende del carrito)
const ItemGrid = memo(function ItemGrid({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #eee",
            borderRadius: 10,
            padding: 12,
            // Ajustes anti-flicker
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <img
            src={p.img}
            alt={p.title}
            loading="lazy"
            decoding="async"
            width={300}
            height={300}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/300?text=Imagen";
            }}
            style={{
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: 8,
              display: "block",
            }}
          />
          <h4 style={{ margin: "8px 0 4px", fontSize: 16 }}>{p.title}</h4>
          <div style={{ opacity: 0.7, marginBottom: 8 }}>${p.price}</div>
          {/* Botón para agregar al carrito */}
          <AddBtn product={p} />
        </div>
      ))}
    </div>
  );
});

function ItemListContainer({ greeting }) {
  const { categoryId } = useParams(); // lee /category/:categoryId (undefined en "/")

  // Filtra por categoría de la URL; si no hay, muestra todo
  const items = useMemo(() => {
    if (!categoryId) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === categoryId);
  }, [categoryId]);

  return (
    <section style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>{greeting}</h2>
      {/* Grilla de productos */}
      <ItemGrid items={items} />
    </section>
  );
}

// Evita re-render si no cambian props/URL
export default memo(ItemListContainer);
