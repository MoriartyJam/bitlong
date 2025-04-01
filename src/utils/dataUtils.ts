
import { Establishment, Transaction, EstablishmentWithTransactions } from "@/types";
import { supabase } from "@/utils/supabaseClient";
import { Establishment } from "@/types";


// Local storage keys
const ESTABLISHMENTS_KEY = 'biltong-tracker-establishments';
const TRANSACTIONS_KEY = 'biltong-tracker-transactions';

export const fetchEstablishmentsFromSupabase = async (): Promise<Establishment[]> => {
  const { data, error } = await supabase.from("establishments").select("*");

  if (error || !data) {
    console.error("❌ Ошибка загрузки заведений из Supabase:", error?.message);
    return [];
  }

  return data;
};


export const addTransactionToSupabase = async (
  transaction: Omit<Transaction, "id" | "createdAt">
): Promise<Transaction | null> => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          ...transaction,
          createdat: now,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при вставке транзакции в Supabase:", error.message);
      return null;
    }

    console.log("✅ Транзакция добавлена в Supabase:", data);
    return {
      id: data.id,
      ...data,
      createdAt: data.createdat,
    };
  } catch (err) {
    console.error("❌ Ошибка запроса Supabase:", err);
    return null;
  }
};

// Получить заведения с транзакциями из Supabase
export const fetchEstablishmentsWithTransactionsFromSupabase = async (): Promise<EstablishmentWithTransactions[]> => {
  const { data: establishments, error: estError } = await supabase
    .from("establishments")
    .select("*");

  if (estError || !establishments) {
    console.error("❌ Ошибка загрузки заведений из Supabase:", estError?.message);
    return [];
  }

  const { data: transactions, error: txError } = await supabase
    .from("transactions")
    .select("*");

  if (txError || !transactions) {
    console.error("❌ Ошибка загрузки транзакций из Supabase:", txError?.message);
    return [];
  }

  return establishments.map((est) => {
    const estTransactions = transactions.filter(t => t.establishmentId === est.id);
    const balance = estTransactions.reduce((sum, t) => {
      return t.type === "delivery" ? sum + t.amount : sum - t.amount;
    }, 0);

    return {
      ...est,
      transactions: estTransactions,
      balance,
    };
  });
};

export const updateEstablishmentInSupabase = async (
  establishment: Partial<Establishment> & { id: string }
): Promise<Establishment | null> => {
  try {
    const { id, ...updateFields } = establishment;
    const now = new Date().toISOString();

    const payload: Record<string, any> = {
      name: updateFields.name,
      address: updateFields.address,
      contactname: updateFields.contactname ?? updateFields.contactName,
      contactphone: updateFields.contactphone ?? updateFields.contactPhone,
      contactemail: updateFields.contactemail ?? updateFields.contactEmail,
      notes: updateFields.notes,
      updatedat: now,
    };

    // 🔎 Логируем, что отправляем
    console.log("📦 Данные на обновление:", establishment);
    console.log("📤 Payload в Supabase:", payload);

    const { data, error } = await supabase
      .from("establishments")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при обновлении заведения в Supabase:", error.message);
      return null;
    }

    console.log("✅ Обновлено в Supabase:", data);
    return data as Establishment;
  } catch (err) {
    console.error("❌ Ошибка запроса:", err);
    return null;
  }
};



export const testConnection = async () => {
  const { data, error } = await supabase.from("your_table_name").select("*");
  console.log("Data:", data);
  console.log("Error:", error);
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

export const addEstablishmentToSupabase = async (
  establishment: NewEstablishment
): Promise<Establishment | null> => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("establishments")
      .insert([
        {
          ...establishment,
          createdat: now,
          updatedat: now,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при вставке в Supabase:", error.message);
      return null;
    }

    console.log("✅ Запись добавлена в Supabase:", data);
    return data as Establishment;
  } catch (err) {
    console.error("❌ Ошибка при добавлении заведения:", err);
    return null;
  }
};


// Establishment functions
export const getEstablishments = (): Establishment[] => {
  return getLocalData<Establishment[]>(ESTABLISHMENTS_KEY, []);
};

export const getEstablishment = (id: string): Establishment | undefined => {
  const establishments = getEstablishments();
  return establishments.find(est => est.id === id);
};

export const addEstablishment = (establishment: Omit<Establishment, 'id' | 'createdAt' | 'updatedAt'>): Establishment => {
  const now = new Date().toISOString();
  const newEstablishment: Establishment = {
    id: crypto.randomUUID(),
    ...establishment,
    createdAt: now,
    updatedAt: now
  };
  
  const establishments = getEstablishments();
  establishments.push(newEstablishment);
  setLocalData(ESTABLISHMENTS_KEY, establishments);
  
  return newEstablishment;
};

export const updateEstablishment = (establishment: Partial<Establishment> & { id: string }): Establishment | undefined => {
  const establishments = getEstablishments();
  const index = establishments.findIndex(est => est.id === establishment.id);
  
  if (index === -1) return undefined;
  
  const updatedEstablishment = {
    ...establishments[index],
    ...establishment,
    updatedAt: new Date().toISOString()
  };
  
  establishments[index] = updatedEstablishment;
  setLocalData(ESTABLISHMENTS_KEY, establishments);
  
  return updatedEstablishment;
};

export const deleteEstablishment = (id: string): boolean => {
  const establishments = getEstablishments();
  const newEstablishments = establishments.filter(est => est.id !== id);
  
  if (establishments.length === newEstablishments.length) return false;
  
  setLocalData(ESTABLISHMENTS_KEY, newEstablishments);
  
  // Also delete related transactions
  const transactions = getTransactions();
  const newTransactions = transactions.filter(t => t.establishmentId !== id);
  setLocalData(TRANSACTIONS_KEY, newTransactions);
  
  return true;
};

// Transaction functions
export const getTransactions = (): Transaction[] => {
  return getLocalData<Transaction[]>(TRANSACTIONS_KEY, []);
};

export const getTransactionsByEstablishment = (establishmentId: string): Transaction[] => {
  const transactions = getTransactions();
  return transactions.filter(t => t.establishmentId === establishmentId);
};

export const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction => {
  const now = new Date().toISOString();
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    ...transaction,
    createdAt: now
  };
  
  const transactions = getTransactions();
  transactions.push(newTransaction);
  setLocalData(TRANSACTIONS_KEY, transactions);
  
  return newTransaction;
};

export const deleteTransaction = (id: string): boolean => {
  const transactions = getTransactions();
  const newTransactions = transactions.filter(t => t.id !== id);
  
  if (transactions.length === newTransactions.length) return false;
  
  setLocalData(TRANSACTIONS_KEY, newTransactions);
  return true;
};

// Combined functions
export const getEstablishmentsWithTransactions = (): EstablishmentWithTransactions[] => {
  const establishments = getEstablishments();
  const transactions = getTransactions();
  
  return establishments.map(est => {
    const estTransactions = transactions.filter(t => t.establishmentId === est.id);
    const balance = estTransactions.reduce((sum, t) => {
      // For deliveries, we add to the balance (they owe us)
      // For payments, we subtract from the balance (they paid us)
      return t.type === 'delivery' ? sum + t.amount : sum - t.amount;
    }, 0);
    
    return {
      ...est,
      transactions: estTransactions,
      balance
    };
  });
};

export const getDashboardStats = () => {
  const establishments = getEstablishments();
  const transactions = getTransactions();
  
  const totalDeliveries = transactions
    .filter(t => t.type === 'delivery')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalPayments = transactions
    .filter(t => t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalOutstanding = totalDeliveries - totalPayments;
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return {
    totalEstablishments: establishments.length,
    totalDeliveries,
    totalPayments,
    totalOutstanding,
    recentTransactions
  };
};
