// Favorites Context
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { isAuthenticated, user } = useAuth();
  const { success } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      const saved = localStorage.getItem(`swadika_favorites_${user.id}`);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user && favorites.length > 0) {
      localStorage.setItem(`swadika_favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      if (prev.includes(dishId)) {
        success("Removed from favorites");
        return prev.filter((id) => id !== dishId);
      } else {
        success("Added to favorites ❤️");
        return [...prev, dishId];
      }
    });
  };

  const isFavorite = (dishId: string) => {
    return favorites.includes(dishId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
