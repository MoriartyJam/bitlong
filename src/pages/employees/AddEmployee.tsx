
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddEmployee() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="mb-8">
        <Link 
          to="/employees" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('employees.backToEmployees')}
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-6">{t('employees.addNew')}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm p-6 border">
        <EmployeeForm />
      </div>
    </Layout>
  );
}
