// src/App.jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart"; // import del carrito

function NotFound() {
  return (
    <div style={{ padding: 24, textAlign: "center" }}>
      <h2>404 — Página no encontrada</h2>
      <a href="/" style={{ display: "inline-block", marginTop: 12 }}>
        Volver al inicio
      </a>
    </div>
  );
}

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<ItemListContainer greeting="¡Bienvenido a Fighters Argentina!" />}
        />

        {/* Categoría */}
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Catálogo por categoría" />}
        />

        {/* Detalle */}
        <Route path="/item/:productId" element={<ItemDetailContainer />} />

        {/* ✅ Carrito */}
        <Route path="/cart" element={<Cart />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
