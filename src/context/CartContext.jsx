import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  // Estado inicial desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistir cambios
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Acciones
  const add = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const remove = id => setCart(prev => prev.filter(i => i.id !== id));
  const clear = () => setCart([]);
  const setQty = (id, qty) =>
    setCart(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(1, Number(qty) || 1) } : i
      )
    );

  // Derivados
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  const total = cart.reduce((acc, i) => acc + i.qty * (i.price || 0), 0);

  const value = { cart, add, remove, clear, setQty, count, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
