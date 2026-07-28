import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const getStock = (product) => Number(product.stock ?? product.countInStock ?? 999);
const getSalePrice = (product) => product.discount
  ? Number((Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(2))
  : Number(product.price);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cartItems")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, requestedQty = 1) => {
    const quantity = Math.max(1, Number(requestedQty) || 1);
    const stock = getStock(product);
    if (stock <= 0) return;
    const normalizedProduct = {
      ...product,
      originalPrice: product.originalPrice ?? Number(product.price),
      price: getSalePrice(product),
      stock,
    };
    setCartItems((items) => {
      const existing = items.find((item) => item._id === product._id);
      if (!existing) return [...items, { ...normalizedProduct, qty: Math.min(quantity, stock) }];
      return items.map((item) => item._id === product._id
        ? { ...item, ...normalizedProduct, qty: Math.min(Number(item.qty) + quantity, stock) }
        : item);
    });
  };

  const updateQuantity = (id, requestedQty) => {
    setCartItems((items) => items
      .map((item) => item._id === id
        ? { ...item, qty: Math.min(Math.max(0, Number(requestedQty) || 0), getStock(item)) }
        : item)
      .filter((item) => item.qty > 0));
  };

  const increaseQty = (id) => setCartItems((items) => items.map((item) =>
    item._id === id ? { ...item, qty: Math.min(item.qty + 1, getStock(item)) } : item));
  const decreaseQty = (id) => setCartItems((items) => items
    .map((item) => item._id === id ? { ...item, qty: item.qty - 1 } : item)
    .filter((item) => item.qty > 0));
  const removeFromCart = (id) => setCartItems((items) => items.filter((item) => item._id !== id));
  const clearCart = () => setCartItems([]);
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.qty), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + Number(item.qty), 0);

  return <CartContext.Provider value={{
    cartItems, addToCart, updateQuantity, increaseQty, decreaseQty,
    removeFromCart, clearCart, totalPrice, totalItems,
  }}>{children}</CartContext.Provider>;
}
