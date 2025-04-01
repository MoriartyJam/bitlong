import { supabase } from "@/utils/supabaseClient";
import { Transaction } from "@/types";

/**
 * Добавление транзакции в Supabase
 */
export const addTransactionToSupabase = async (
  transaction: Omit<Transaction, "id" | "createdAt">
): Promise<Transaction | null> => {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("transactions")
      .insert([{
        establishmentid: transaction.establishmentId,
        employeeid: transaction.employeeId,
        productid: transaction.productId || null,
        quantity: transaction.quantity || null,
        type: transaction.type,
        amount: transaction.amount,
        date: transaction.date,
        paymentstatus: transaction.paymentStatus,
        notes: transaction.notes || "",
        createdat: now,
      }])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при добавлении транзакции в Supabase:", error.message);
      return null;
    }

    console.log("✅ Транзакция добавлена в Supabase:", data);

    return {
      id: data.id,
      establishmentId: data.establishmentid,
      employeeId: data.employeeid,
      productId: data.productid,
      quantity: data.quantity,
      type: data.type,
      amount: data.amount,
      date: data.date,
      paymentStatus: data.paymentstatus,
      notes: data.notes,
      createdAt: data.createdat,
    };
  } catch (err) {
    console.error("❌ Ошибка запроса:", err);
    return null;
  }
};
