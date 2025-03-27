
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, Search, Package, AlertTriangle, Archive, Tag 
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";
import { getProducts } from "@/utils/productUtils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const products = getProducts();
  const { t } = useLanguage();
  
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter for low stock products
  const lowStockProducts = filteredProducts.filter(
    product => product.quantity <= product.lowStockLimit
  );

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t('products.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('products.subtitle')}
          </p>
        </div>
        
        <Link to="/products/add">
          <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" />
            {t('products.add')}
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('products.search')}
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="available" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="available" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            {t('products.available')}
          </TabsTrigger>
          <TabsTrigger value="low-stock" className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            {t('products.lowStock')}
            {lowStockProducts.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {lowStockProducts.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">{t('products.empty')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('products.emptyDesc')}
              </p>
              <Link to="/products/add" className="mt-4 inline-block">
                <Button className="bg-green-500 hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" />
                  {t('products.add')}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="low-stock">
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">{t('products.noLowStock')}</h3>
              <p className="mt-2 text-muted-foreground">
                {t('products.adequateStock')}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lowStockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Link to="/products/add">
        <Button
          className="rounded-full w-14 h-14 fixed bottom-6 right-6 shadow-lg md:hidden"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </Layout>
  );
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isLowStock = product.quantity <= product.lowStockLimit;
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{product.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Archive className="mr-1 h-3 w-3" /> 
                {product.productId}
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {product.category}
            </Badge>
          </div>
          
          {product.description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{t('products.inStock')}</p>
              <div className="flex items-center">
                <span className={`text-lg font-semibold ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
                  {product.quantity}
                </span>
                {isLowStock && (
                  <Badge variant="outline" className="ml-2 text-destructive border-destructive">
                    {t('products.lowStock')}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{t('products.price')}</p>
              <div className="flex items-center">
                <Tag className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-lg font-semibold">
                  ₴ {product.sellingUnitPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
