
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, ArrowDown, ArrowUp } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction, Establishment } from "@/types";
import { getTransactions, getEstablishment } from "@/utils/dataUtils";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { t } = useLanguage();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const data = getTransactions();
    setTransactions(data);
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      // Type filter
      if (typeFilter !== "all" && transaction.type !== typeFilter) {
        return false;
      }
      
      // Search filter
      const establishment = getEstablishment(transaction.establishmentId);
      const searchTerms = [
        establishment?.name,
        establishment?.contactName,
        transaction.notes,
        transaction.amount.toString()
      ].filter(Boolean).join(" ").toLowerCase();
      
      if (searchQuery && !searchTerms.includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const getEstablishmentName = (establishmentId: string) => {
    const establishment = getEstablishment(establishmentId);
    return establishment?.name || "Unknown";
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('transactions.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('transactions.subtitle')}
          </p>
        </div>
        <Link to="/transactions/add">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            {t('transactions.add')}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('transactions.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="w-full md:w-40">
          <Select 
            value={typeFilter} 
            onValueChange={setTypeFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('transactions.type')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('transactions.allTypes')}</SelectItem>
              <SelectItem value="delivery">{t('transactions.deliveries')}</SelectItem>
              <SelectItem value="payment">{t('transactions.payments')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSortOrder}
          className="w-10 h-10"
        >
          {sortOrder === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">{t('transactions.date')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('transactions.establishment')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('transactions.type')}</th>
                  <th className="text-right py-3 px-4 font-medium">{t('transactions.amount')}</th>
                  <th className="text-left py-3 px-4 font-medium">{t('transactions.notes')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-muted/30">
                    <td className="py-3 px-4 text-sm">
                      {format(new Date(transaction.date), "MMM d, yyyy")}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {getEstablishmentName(transaction.establishmentId)}
                    </td>
                    <td className="py-3 px-4">
                      <span 
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.type === "delivery" 
                            ? "bg-orange-100 text-orange-800" 
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {transaction.type === "delivery" ? t('transactions.delivery') : t('transactions.payment')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ₴ {transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground truncate max-w-xs">
                      {transaction.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">{t('transactions.noTransactions')}</h3>
            <p className="text-muted-foreground mt-1 mb-4 max-w-md">
              {searchQuery || typeFilter !== "all"
                ? t('transactions.adjustFilters')
                : t('transactions.noTransactionsYet')
              }
            </p>
            <Link to="/transactions/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('transactions.add')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
