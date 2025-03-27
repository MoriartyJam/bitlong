
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import TransactionForm from "@/components/forms/TransactionForm";
import { useLanguage } from "@/contexts/LanguageContext";

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
