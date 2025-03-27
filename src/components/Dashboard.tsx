
import { Link } from "react-router-dom";
import { Plus, ShoppingBag, ReceiptText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedNumber from "@/components/AnimatedNumber";
import { getDashboardStats, getEstablishment } from "@/utils/dataUtils";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const stats = getDashboardStats();
  const { t } = useLanguage();
  
  const currencyFormatter = (value: number) => 
    `₴ ${value.toFixed(2)}`;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/establishments/add">
            <Button variant="outline">
              <ShoppingBag className="h-4 w-4 mr-2" />
              {t('establishments.add')}
            </Button>
          </Link>
          <Link to="/transactions/add">
            <Button>
              <ReceiptText className="h-4 w-4 mr-2" />
              {t('transactions.add')}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('dashboard.totalOutstanding')}</CardDescription>
            <CardTitle className="text-2xl font-bold">
              <AnimatedNumber 
                value={stats.totalOutstanding} 
                formatter={currencyFormatter} 
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {t('dashboard.balance')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('dashboard.totalDeliveries')}</CardDescription>
            <CardTitle className="text-2xl font-bold">
              <AnimatedNumber 
                value={stats.totalDeliveries} 
                formatter={currencyFormatter} 
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {t('dashboard.deliveriesValue')}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('dashboard.totalPayments')}</CardDescription>
            <CardTitle className="text-2xl font-bold">
              <AnimatedNumber 
                value={stats.totalPayments} 
                formatter={currencyFormatter} 
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {t('dashboard.paymentsCollected')}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('dashboard.recentTransactions')}</h2>
          <Link 
            to="/transactions" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            {t('dashboard.viewAll')}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <Card>
          {stats.recentTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">{t('transactions.date')}</th>
                    <th className="text-left py-3 px-4 font-medium">{t('transactions.establishment')}</th>
                    <th className="text-left py-3 px-4 font-medium">{t('transactions.type')}</th>
                    <th className="text-right py-3 px-4 font-medium">{t('transactions.amount')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {stats.recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-muted/30">
                      <td className="py-3 px-4 text-sm">
                        {format(new Date(transaction.date), "MMM d, yyyy")}
                      </td>
                      <td className="py-3 px-4 font-medium">
                        {getEstablishment(transaction.establishmentId)?.name || "Unknown"}
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
                        {t('app.currency')} {transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <ReceiptText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg">{t('dashboard.noTransactions')}</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                {t('dashboard.startRecording')}
              </p>
              <Link to="/transactions/add">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('transactions.add')}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('dashboard.establishments')}</h2>
          <Link 
            to="/establishments" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center"
          >
            {t('dashboard.viewAll')}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('dashboard.establishments')}</CardTitle>
              <CardDescription>{t('dashboard.totalEstablishments')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalEstablishments}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/establishments/add">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('dashboard.addNew')}
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('dashboard.getStarted')}</CardTitle>
              <CardDescription>{t('dashboard.quickActions')}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              <Link to="/establishments">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {t('establishments.title')}
                </Button>
              </Link>
              <Link to="/transactions">
                <Button variant="outline" className="w-full justify-start">
                  <ReceiptText className="h-4 w-4 mr-2" />
                  {t('transactions.title')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
