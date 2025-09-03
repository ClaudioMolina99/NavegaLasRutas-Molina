// src/components/ItemListContainer.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "./services/products";

export default function ItemListContainer({ greeting = "Catálogo" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getProducts(categoryId)
      .then((data) => alive && setItems(data))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [categoryId]);

  if (loading) return <p style={{ padding: 16 }}>Cargando...</p>;

  return (
    <section style={{ padding: 16 }}>
      <h1>{greeting}{categoryId ? `: ${categoryId}` : ""}</h1>

      {items.length === 0 && <p>No hay productos en esta categoría.</p>}

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {items.map((item) => (
          <article
            key={item.id}
            style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}
          >
            <img
              src={item.img || item.pictureUrl}
              alt={item.title}
              width="100%"
              height="auto"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/320x200?text=Producto";
              }}
            />
            <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
            <p>${item.price}</p>

            {/* ✅ Enlace al detalle en Home y en Categoría */}
            <Link
              to={`/item/${item.id}`}
              style={{
                display: "inline-block",
                marginTop: 8,
                textDecoration: "none",
                border: "1px solid #000",
                padding: "6px 10px",
                borderRadius: 6,
              }}
            >
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
