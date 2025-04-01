
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Product } from '@/types';
import { addProduct, getProductCategories, generateProductId, addProductToSupabase } from '@/utils/productUtils';
import { useLanguage } from '@/contexts/LanguageContext';

// Validation schema
const productSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  quantity: z.coerce.number().min(0, 'Quantity must be 0 or greater'),
  lowStockLimit: z.coerce.number().min(0, 'Low stock limit must be 0 or greater'),
  sellingUnitPrice: z.coerce.number().min(0, 'Selling price must be 0 or greater'),
  buyingUnitPrice: z.coerce.number().min(0, 'Buying price must be 0 or greater'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  existingProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [productId, setProductId] = useState<string>('');
  const [totalSellingPrice, setTotalSellingPrice] = useState<number>(0);
  const { t } = useLanguage();
  
  // Set up form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: existingProduct ? {
      title: existingProduct.title,
      description: existingProduct.description || '',
      category: existingProduct.category,
      quantity: existingProduct.quantity,
      lowStockLimit: existingProduct.lowStockLimit,
      sellingUnitPrice: existingProduct.sellingUnitPrice,
      buyingUnitPrice: existingProduct.buyingUnitPrice,
    } : {
      title: '',
      description: '',
      category: '',
      quantity: 0,
      lowStockLimit: 5,
      sellingUnitPrice: 0,
      buyingUnitPrice: 0,
    }
  });

  useEffect(() => {
    // Load categories from existing products
    const loadedCategories = getProductCategories();
    setCategories(loadedCategories);
    
    // Generate a product ID for new products
    if (!existingProduct) {
      setProductId(generateProductId());
    } else {
      setProductId(existingProduct.productId);
    }
  }, [existingProduct]);

  // Watch values to calculate total selling price
  const quantity = form.watch('quantity');
  const sellingUnitPrice = form.watch('sellingUnitPrice');
  
  useEffect(() => {
    const total = quantity * sellingUnitPrice;
    setTotalSellingPrice(total);
  }, [quantity, sellingUnitPrice]);

const onSubmit = async (data: ProductFormValues) => {
  try {
    const added = await addProductToSupabase({
      title: data.title,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      lowStockLimit: data.lowStockLimit,
      sellingUnitPrice: data.sellingUnitPrice,
      buyingUnitPrice: data.buyingUnitPrice,
    });

    if (added) {
      // Сохраняем в localStorage
      addProduct(added);
      toast.success(t('productForm.success'));
      navigate('/products');
    } else {
      toast.error(t('productForm.error'));
    }
  } catch (error) {
    console.error('Ошибка при добавлении продукта:', error);
    toast.error(t('productForm.error'));
  }
};

  const today = format(new Date(), 'PPP');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product ID */}
          <FormItem>
            <FormLabel>{t('productForm.productId')}</FormLabel>
            <Input value={productId} disabled className="bg-muted" />
          </FormItem>

          {/* Creation Date */}
          <FormItem>
            <FormLabel>{t('productForm.date')}</FormLabel>
            <Input value={today} disabled className="bg-muted" />
          </FormItem>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('productForm.title')}*</FormLabel>
                <FormControl>
                  <Input placeholder={t('productForm.title')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>{t('productForm.description')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('productForm.description')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.category')}*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('productForm.selectCategory')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Allow for manually entered categories */}
                    <SelectItem value="New">{t('productForm.newCategory')}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.quantity')}*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Low Stock Limit */}
          <FormField
            control={form.control}
            name="lowStockLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.lowStockLimit')}*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Selling Unit Price */}
          <FormField
            control={form.control}
            name="sellingUnitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.sellingUnitPrice')}*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buying Unit Price */}
          <FormField
            control={form.control}
            name="buyingUnitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('productForm.buyingUnitPrice')}*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total Selling Price (Calculated) */}
          <FormItem className="md:col-span-2">
            <FormLabel>{t('productForm.totalSellingPrice')}</FormLabel>
            <Input 
              value={`₴ ${totalSellingPrice.toFixed(2)}`} 
              disabled 
              className="bg-muted font-semibold" 
            />
          </FormItem>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="bg-green-500 hover:bg-green-600"
          >
            {t('productForm.saveProduct')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
