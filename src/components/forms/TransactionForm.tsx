
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { addTransaction, getEstablishments } from "@/utils/dataUtils";
import { getEmployees } from "@/utils/employeeUtils";
import { getProducts } from "@/utils/productUtils";
import { useEffect, useState } from "react";
import { Employee, Establishment, Product } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const transactionSchema = z.object({
  establishmentId: z.string({
    required_error: "Please select an establishment",
  }),
  employeeId: z.string({
    required_error: "Please select an employee",
  }),
  type: z.enum(["delivery", "payment"], {
    required_error: "Please select a transaction type",
  }),
  productId: z.string().optional(),
  quantity: z.coerce.number().min(1).optional(),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .positive("Amount must be greater than 0"),
  date: z.date({
    required_error: "Date is required",
  }),
  paymentStatus: z.enum(["paid", "credit"], {
    required_error: "Please select payment status",
  }),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.type === "delivery") {
    return !!data.productId && !!data.quantity;
  }
  return true;
}, {
  message: "Product and quantity are required for deliveries",
  path: ["productId"],
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  establishmentId?: string;
  onSuccess?: () => void;
}

export default function TransactionForm({ establishmentId, onSuccess }: TransactionFormProps) {
  const navigate = useNavigate();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setEstablishments(getEstablishments());
    setEmployees(getEmployees());
    setProducts(getProducts());
  }, []);

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      establishmentId: establishmentId || "",
      employeeId: "",
      type: "delivery",
      productId: "",
      quantity: undefined,
      amount: undefined,
      date: new Date(),
      paymentStatus: "paid",
      notes: "",
    },
  });

  const watchType = form.watch("type");
  const watchProductId = form.watch("productId");
  const watchQuantity = form.watch("quantity");

  // Update selected product when product ID changes
  useEffect(() => {
    if (watchProductId) {
      const product = products.find(p => p.id === watchProductId) || null;
      setSelectedProduct(product);
      
      // Calculate amount automatically if product and quantity are set
      if (product && watchQuantity && watchType === "delivery") {
        const calculatedAmount = product.sellingUnitPrice * watchQuantity;
        form.setValue("amount", calculatedAmount);
      }
    } else {
      setSelectedProduct(null);
    }
  }, [watchProductId, watchQuantity, products, form, watchType]);

  const onSubmit = (values: TransactionFormValues) => {
    try {
      // Ensure all required fields are present
      const transactionData = {
        establishmentId: values.establishmentId,
        employeeId: values.employeeId,
        productId: values.type === "delivery" ? values.productId : undefined,
        quantity: values.type === "delivery" ? values.quantity : undefined,
        type: values.type,
        amount: Number(values.amount),
        date: values.date.toISOString(),
        paymentStatus: values.paymentStatus,
        notes: values.notes || "",
      };
      
      addTransaction(transactionData);
      toast.success(t('transactionForm.success'));
      
      form.reset({
        establishmentId: values.establishmentId,
        employeeId: "",
        type: "delivery",
        productId: "",
        quantity: undefined,
        amount: undefined,
        date: new Date(),
        paymentStatus: "paid",
        notes: "",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/transactions");
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast.error(t('transactionForm.error'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="establishmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.establishment')}</FormLabel>
              <Select
                disabled={!!establishmentId}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('transactionForm.selectEstablishment')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {establishments.map((establishment) => (
                    <SelectItem key={establishment.id} value={establishment.id}>
                      {establishment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.employee')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('transactionForm.selectEmployee')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.type')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('transactionForm.selectType')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="delivery">{t('transactions.delivery')}</SelectItem>
                  <SelectItem value="payment">{t('transactions.payment')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchType === "delivery" && (
          <>
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('transactionForm.product')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('transactionForm.selectProduct')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title} ({t('app.currency')} {product.sellingUnitPrice})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('transactionForm.quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder={t('transactionForm.enterQuantity')}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.amount')}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder={t('transactionForm.enterAmount')}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.valueAsNumber);
                  }}
                  readOnly={watchType === "delivery" && !!watchProductId && !!watchQuantity}
                  className={watchType === "delivery" && !!watchProductId && !!watchQuantity ? "bg-muted" : ""}
                />
              </FormControl>
              {watchType === "delivery" && selectedProduct && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProduct.title}: {t('app.currency')} {selectedProduct.sellingUnitPrice} × {watchQuantity || 0} = {t('app.currency')} {(selectedProduct.sellingUnitPrice * (watchQuantity || 0)).toFixed(2)}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.paymentStatus')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('transactionForm.selectPaymentStatus')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="paid">{t('transactions.paymentStatusPaid')}</SelectItem>
                  <SelectItem value="credit">{t('transactions.paymentStatusCredit')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('transactionForm.date')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{t('transactionForm.pickDate')}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date || new Date())}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('transactionForm.notes')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('transactionForm.additionalNotes')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/transactions")}
          >
            {t('app.cancel')}
          </Button>
          <Button type="submit">{t('transactionForm.save')}</Button>
        </div>
      </form>
    </Form>
  );
}
