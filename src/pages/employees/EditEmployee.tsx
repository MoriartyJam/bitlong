
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { getEmployee } from "@/utils/employeeUtils";
import { Employee } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";


// Обновление данных сотрудника в Supabase
export const updateEmployeeInSupabase = async (employee: Employee): Promise<boolean> => {
  const { id, ...rest } = employee;

  const { data, error } = await supabase
    .from("employees")
    .update({
      ...rest,
      updatedat: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("❌ Ошибка при обновлении в Supabase:", error);
    return false;
  }

  console.log("✅ Сотрудник обновлён в Supabase:", data);
  return true;
};


export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (!id) {
      toast.error(t('employees.idNotProvided'));
      navigate("/employees");
      return;
    }

    const employeeData = getEmployee(id);
    if (!employeeData) {
      toast.error(t('employees.notFound'));
      navigate("/employees");
      return;
    }

    setEmployee(employeeData);
    setLoading(false);
  }, [id, navigate, t]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p>{t('app.loading')}</p>
        </div>
      </Layout>
    );
  }

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
        <h1 className="text-3xl font-bold mt-4 mb-6">{t('employees.editEmployee')}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm p-6 border">
        {employee && <EmployeeForm employee={employee} />}
      </div>
    </Layout>
  );
}
