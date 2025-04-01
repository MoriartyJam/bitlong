import { supabase } from "@/utils/supabaseClient";
import { Product } from "@/types";

// Local storage key
const PRODUCTS_KEY = 'biltong-tracker-products';

export const addProductToSupabase = async (
  product: Omit<Product, "id" | "createdAt">
): Promise<Product | null> => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title: product.title,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          lowstocklimit: product.lowStockLimit,
          sellingunitprice: product.sellingUnitPrice,
          buyingunitprice: product.buyingUnitPrice,
          createdat: now,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при добавлении продукта в Supabase:", error.message);
      return null;
    }

    console.log("✅ Продукт добавлен в Supabase:", data);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      lowStockLimit: data.lowstocklimit,
      sellingUnitPrice: data.sellingunitprice,
      buyingUnitPrice: data.buyingunitprice,
      createdAt: data.createdat,
    };
  } catch (err) {
    console.error("❌ Ошибка запроса:", err);
    return null;
  }
};


// Helper functions for localStorage
const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error getting data from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

const setLocalData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data in localStorage for key ${key}:`, error);
  }
};

// Generate a unique product ID with format P-XXXX
export const generateProductId = (): string => {
  const products = getProducts();
  let number = products.length + 1;
  
  // Ensure uniqueness
  while (products.some(p => p.productId === `P-${number.toString().padStart(4, '0')}`)) {
    number++;
  }
  
  return `P-${number.toString().padStart(4, '0')}`;
};

// Product functions
export const getProducts = (): Product[] => {
  return getLocalData<Product[]>(PRODUCTS_KEY, []);
};

export const getProduct = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

export const addProduct = (product: Omit<Product, 'id' | 'productId' | 'createdAt' | 'updatedAt'>): Product => {
  const now = new Date().toISOString();
  const newProduct: Product = {
    id: crypto.randomUUID(),
    productId: generateProductId(),
    ...product,
    createdAt: now,
    updatedAt: now
  };
  
  const products = getProducts();
  products.push(newProduct);
  setLocalData(PRODUCTS_KEY, products);
  
  return newProduct;
};

export const updateProduct = (product: Partial<Product> & { id: string }): Product | undefined => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index === -1) return undefined;
  
  const updatedProduct = {
    ...products[index],
    ...product,
    updatedAt: new Date().toISOString()
  };
  
  products[index] = updatedProduct;
  setLocalData(PRODUCTS_KEY, products);
  
  return updatedProduct;
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const newProducts = products.filter(p => p.id !== id);
  
  if (products.length === newProducts.length) return false;
  
  setLocalData(PRODUCTS_KEY, newProducts);
  
  return true;
};

export const getProductCategories = (): string[] => {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories;
};
