// src/components/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section style={{ padding: 24, textAlign: "center" }}>
      <h2>404 — Página no encontrada</h2>
      <p>El enlace que seguiste no existe o se movió.</p>
      <Link to="/" style={{ display: "inline-block", marginTop: 12 }}>
        Volver al inicio
      </Link>
    </section>
  );
}
