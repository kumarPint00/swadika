"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import enTranslations from "@/locales/en.json";
import hiTranslations from "@/locales/hi.json";

type Locale = "en" | "hi";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getDishTranslation: (dishId: string, field: 'story' | 'ingredients' | 'instructions') => string | string[];
}

const translations = {
  en: enTranslations,
  hi: hiTranslations,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "hi")) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  const getDishTranslation = (dishId: string, field: 'story' | 'ingredients' | 'instructions'): string | string[] => {
    const dishTranslations = translations[locale].dishes;
    if (dishTranslations && dishTranslations[dishId]) {
      return dishTranslations[dishId][field] || '';
    }
    return field === 'ingredients' || field === 'instructions' ? [] : '';
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, getDishTranslation }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
