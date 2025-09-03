import { Routes, Route } from "react-router-dom";      
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div>
        <NavBar />
        <Routes>
          {/* Home (catálogo general) */}
          <Route
            path="/"
            element={<ItemListContainer greeting="¡Bienvenido a Fighters Argentina!" />}
          />

          {/* Catálogo por categoría */}
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="Catálogo por categoría" />}
          />

          {/* Extras que ya tenés */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
