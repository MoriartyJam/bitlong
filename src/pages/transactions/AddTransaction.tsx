
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TransactionForm from "@/components/forms/TransactionForm";
import { useLanguage } from "@/contexts/LanguageContext";

import { Transaction } from "@/types";
import { supabase } from "@/utils/supabaseClient";

export const addTransactionToSupabase = async (
  transaction: Omit<Transaction, "id" | "createdAt">
): Promise<Transaction | null> => {
  try {
    const now = new Date().toISOString();

    const newTransaction = {
      ...transaction,
      createdat: now,
    };

    const { data, error } = await supabase
      .from("transactions")
      .insert([newTransaction])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при добавлении транзакции в Supabase:", error.message);
      return null;
    }

    console.log("✅ Транзакция добавлена в Supabase:", data);

    // ✅ Добавим в localStorage
    const localTransaction: Transaction = {
      id: data.id,
      establishmentId: data.establishmentid,
      type: data.type,
      amount: data.amount,
      date: data.date || now,
      notes: data.notes || "",
      createdAt: data.createdat,
    };

    const existing = getTransactions();
    existing.push(localTransaction);
    setLocalData("biltong-tracker-transactions", existing);

    return localTransaction;
  } catch (err) {
    console.error("❌ Ошибка запроса:", err);
    return null;
  }
};

export default function AddTransaction() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="mb-8">
        <Link 
          to="/transactions" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('transactionForm.back')}
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-6">{t('transactionForm.title')}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm p-6 border">
        <TransactionForm />
      </div>
    </Layout>
  );
}
