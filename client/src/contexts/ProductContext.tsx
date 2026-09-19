import React, { createContext, useContext, useEffect, useState } from "react";
import { products as initialProducts, type Product } from "@/data/mockDatabase";

const STORAGE_KEY = "touchworth_products";

interface ProductContextType {
  products: Product[];
  categories: string[];
  addProduct: (product: Omit<Product, "id">) => Product;
  removeProduct: (id: number) => void;
  resetToDefaultProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse products from localStorage:", e);
    }
    return initialProducts;
  });

  // Keep localStorage synced whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage:", e);
    }
  }, [products]);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category.trim()).filter(Boolean))),
  ];

  const addProduct = (newProd: Omit<Product, "id">): Product => {
    const nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const created: Product = {
      ...newProd,
      id: nextId,
    };
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        removeProduct,
        resetToDefaultProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
