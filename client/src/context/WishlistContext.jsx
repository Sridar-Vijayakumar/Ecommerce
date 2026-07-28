import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);
  const toggleWishlist = (product) => setWishlist((items) => items.some((item) => item._id === product._id) ? items.filter((item) => item._id !== product._id) : [...items, product]);
  const removeFromWishlist = (id) => setWishlist((items) => items.filter((item) => item._id !== id));
  const isWishlisted = (id) => wishlist.some((item) => item._id === id);
  return <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isWishlisted }}>{children}</WishlistContext.Provider>;
}
