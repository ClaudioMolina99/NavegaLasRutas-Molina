// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

  const toKey = (v) => String(v);

  // Agregar / actualizar respetando stock (si existe)
  const add = (product, qty = 1) => {
    const inc = Math.max(1, Number(qty) || 1);
    setCart((prev) => {
      const key = toKey(product.id);
      const idx = prev.findIndex((i) => toKey(i.id) === key);
      if (idx !== -1) {
        const copy = [...prev];
        const current = copy[idx];
        const max = product.stock ?? current.stock ?? Infinity;
        const nextQty = Math.min((current.qty || 0) + inc, max);
        copy[idx] = { ...current, ...product, qty: nextQty };
        return copy;
      }
      const max = product.stock ?? Infinity;
      const safeQty = Math.min(inc, max);
      return [...prev, { ...product, qty: safeQty }];
    });
  };

  const remove = (id) =>
    setCart((prev) => prev.filter((i) => toKey(i.id) !== toKey(id)));

  const clear = () => setCart([]);

  const setQty = (id, qty) => {
    setCart((prev) =>
      prev.map((i) => {
        if (toKey(i.id) !== toKey(id)) return i;
        const max = i.stock ?? Infinity;
        const next = Math.max(1, Math.min(Number(qty) || 1, max));
        return { ...i, qty: next };
      })
    );
  };

  // Derivados
  const count = useMemo(
    () => cart.reduce((acc, i) => acc + (Number(i.qty) || 0), 0),
    [cart]
  );

  const total = useMemo(
    () =>
      cart.reduce(
        (acc, i) => acc + (Number(i.qty) || 0) * (Number(i.price) || 0),
        0
      ),
    [cart]
  );

  const value = { cart, add, remove, clear, setQty, count, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
