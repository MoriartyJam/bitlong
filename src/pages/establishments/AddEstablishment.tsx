
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import EstablishmentForm from "@/components/forms/EstablishmentForm";
import { useLanguage } from "@/contexts/LanguageContext";

export const addEstablishmentToSupabase = async (
  establishment: Omit<Establishment, "id" | "createdat" | "updatedat">
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
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Ошибка при вставке:", error.message);
      return null;
    }

    console.log("✅ Запись добавлена в Supabase:", data);
    return data as Establishment;
  } catch (err) {
    console.error("❌ Ошибка запроса:", err);
    return null;
  }
};

export default function AddEstablishment() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="mb-8">
        <Link
          to="/establishments"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('establishmentForm.back')}
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-6">{t('establishmentForm.title.add')}</h1>
      </div>

      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm p-6 border">
        <EstablishmentForm />
      </div>
    </Layout>
  );
}
