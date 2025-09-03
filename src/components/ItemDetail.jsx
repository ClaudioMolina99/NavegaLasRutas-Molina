import ItemCount from "./ItemCount";

export default function ItemDetail({ item }) {
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

        {/* Contador para elegir cantidad y agregar */}
        <ItemCount item={item} />
      </div>
    </section>
  );
}
