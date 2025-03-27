
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, ReceiptText } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Establishment } from "@/types";
import { getEstablishmentsWithTransactions } from "@/utils/dataUtils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import TransactionForm from "@/components/forms/TransactionForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Establishments() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    loadEstablishments();
  }, []);

  const loadEstablishments = () => {
    const data = getEstablishmentsWithTransactions();
    setEstablishments(data);
  };

  const filteredEstablishments = establishments.filter(est => 
    est.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    est.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t('establishments.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('establishments.subtitle')}
          </p>
        </div>
        <Link to="/establishments/add">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            {t('establishments.add')}
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('establishments.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredEstablishments.length > 0 ? (
          filteredEstablishments.map((establishment) => (
            <div
              key={establishment.id}
              className="bg-card rounded-xl border p-4 md:p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4">
                <h2 className="font-semibold text-xl">{establishment.name}</h2>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{establishment.address}</p>
              </div>
              
              <div className="space-y-2 mb-4 md:mb-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('establishments.contact')}:</span>{" "}
                  <span className="font-medium">{establishment.contactName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('establishments.phone')}:</span>{" "}
                  <span className="font-medium">{establishment.contactPhone}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('establishments.email')}:</span>{" "}
                  <span className="font-medium">{establishment.contactEmail}</span>
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{t('establishments.balance')}</span>
                  <span 
                    className={`font-semibold ${(establishment as any).balance > 0 ? 'text-orange-500' : 'text-green-500'}`}
                  >
                    ₴ {(establishment as any).balance.toFixed(2)}
                  </span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${(establishment as any).balance > 0 ? 'bg-orange-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(Math.abs((establishment as any).balance) / 1000 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/establishments/edit/${establishment.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    {t('app.edit')}
                  </Button>
                </Link>
                
                <Sheet onOpenChange={() => {
                  setSelectedEstablishmentId(null);
                }}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      size="sm"
                      onClick={() => setSelectedEstablishmentId(establishment.id)}
                    >
                      <ReceiptText className="h-4 w-4 mr-2" />
                      {t('establishments.transaction')}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-md">
                    <SheetHeader className="mb-6">
                      <SheetTitle>{t('establishments.recordTransaction')}</SheetTitle>
                      <SheetDescription>
                        {t('establishments.addTransaction')} {establishment.name}
                      </SheetDescription>
                    </SheetHeader>
                    {selectedEstablishmentId === establishment.id && (
                      <TransactionForm 
                        establishmentId={establishment.id}
                        onSuccess={loadEstablishments}
                      />
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">{t('establishments.noEstablishments')}</h3>
            <p className="text-muted-foreground mt-1 mb-4 max-w-md">
              {searchQuery 
                ? `${t('establishments.noEstablishmentsMatching')} "${searchQuery}"`
                : t('establishments.noEstablishmentsYet')
              }
            </p>
            <Link to="/establishments/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('establishments.add')}
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Link to="/establishments/add">
        <Button
          className="rounded-full w-14 h-14 fixed bottom-6 right-6 shadow-lg md:hidden"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </Layout>
  );
}
