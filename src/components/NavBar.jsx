// src/components/NavBar.jsx
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const categories = [
  { id: "guantes", label: "Guantes" },
  { id: "vendas", label: "Vendas" },
  { id: "protecciones", label: "Protecciones" },
  { id: "indumentaria", label: "Indumentaria" },
  { id: "accesorios", label: "Accesorios" },
];

function NavBar() {
  const active = ({ isActive }) => ({
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? 700 : 400,
    color: "#111",
  });

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "12px 16px",
        borderBottom: "1px solid #eee",
      }}
    >
      {/* Marca: vuelve al inicio */}
      <Link to="/" style={{ textDecoration: "none", color: "#111" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
          Fighters Argentina
        </h1>
      </Link>

      {/* Links a categorías */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: 16,
          margin: 0,
          padding: 0,
          flexWrap: "wrap",
        }}
      >
        <li>
          <NavLink to="/" style={active}>Inicio</NavLink>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <NavLink to={`/category/${c.id}`} style={active}>
              {c.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Carrito */}
      <Link to="/cart" aria-label="Ir al carrito">
        <CartWidget />
      </Link>
    </nav>
  );
}

export default NavBar;
