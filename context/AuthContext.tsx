"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rewards?: number;
  tier?: "bronze" | "silver" | "gold";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for saved user session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual Firebase auth
    const mockUser: User = {
      id: "user_" + Date.now(),
      name: "Guest User",
      email,
      rewards: 150,
      tier: "silver",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const signup = async (name: string, email: string, password: string) => {
    // TODO: Implement actual Firebase auth
    const newUser: User = {
      id: "user_" + Date.now(),
      name,
      email,
      rewards: 0,
      tier: "bronze",
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
