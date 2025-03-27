
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import EstablishmentForm from "@/components/forms/EstablishmentForm";
import { getEstablishment } from "@/utils/dataUtils";
import { useEffect, useState } from "react";
import { Establishment } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EditEstablishment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState<Establishment | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (id) {
      const data = getEstablishment(id);
      if (!data) {
        navigate("/establishments", { replace: true });
        return;
      }
      setEstablishment(data);
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="animate-pulse">{t('app.loading')}</div>
        </div>
      </Layout>
    );
  }

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
        <h1 className="text-3xl font-bold mt-4 mb-6">{t('establishmentForm.title.edit')}</h1>
      </div>
      
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-sm p-6 border">
        {establishment && <EstablishmentForm initialData={establishment} />}
      </div>
    </Layout>
  );
}
