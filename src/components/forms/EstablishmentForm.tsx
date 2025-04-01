
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEstablishmentInSupabase } from "@/utils/dataUtils";
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
import { addEstablishmentToSupabase, addEstablishment, updateEstablishment } from "@/utils/dataUtils";
import { Establishment } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const establishmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  contactPhone: z.string().min(8, "Phone number must be at least 8 characters"),
  contactEmail: z.string().email("Invalid email address"),
  notes: z.string().optional(),
});

type EstablishmentFormValues = z.infer<typeof establishmentSchema>;

interface EstablishmentFormProps {
  initialData?: Establishment;
  onSuccess?: () => void;
}

export default function EstablishmentForm({ initialData, onSuccess }: EstablishmentFormProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isEditing = !!initialData;

  const form = useForm<EstablishmentFormValues>({
    resolver: zodResolver(establishmentSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      notes: "",
    },
  });

const onSubmit = async (values: EstablishmentFormValues) => {
  try {
    if (isEditing && initialData) {
      // ✅ Обновление в localStorage
      updateEstablishment({ ...values, id: initialData.id });

      // ✅ Обновление в Supabase
      const updated = await updateEstablishmentInSupabase({ ...values, id: initialData.id });

      if (updated) {
        toast.success(t('establishmentForm.success.update'));
      } else {
        toast.error(t('establishmentForm.error'));
        return;
      }
    } else {
      // ✅ Подготовка данных
      const establishmentData = {
        name: values.name,
        address: values.address,
        contactname: values.contactName,
        contactphone: values.contactPhone,
        contactemail: values.contactEmail,
        notes: values.notes || "",
      };

      const added = await addEstablishmentToSupabase(establishmentData);

      if (added) {
        // ✅ Сохраняем и в localStorage
        addEstablishment({
          id: added.id,
          name: added.name,
          address: added.address,
          contactName: added.contactname,
          contactPhone: added.contactphone,
          contactEmail: added.contactemail,
          notes: added.notes,
          createdAt: added.createdat,
          updatedAt: added.updatedat,
        });

        toast.success(t('establishmentForm.success.add'));
        if (onSuccess) onSuccess();
      } else {
        toast.error(t('establishmentForm.error'));
        return;
      }
    }

    form.reset();

    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/establishments");
    }
  } catch (error) {
    console.error("Error saving establishment:", error);
    toast.error(t('establishmentForm.error'));
  }
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('establishmentForm.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('establishmentForm.name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('establishmentForm.address')}</FormLabel>
              <FormControl>
                <Input placeholder={t('establishmentForm.address')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('establishmentForm.contactPerson')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('establishmentForm.contactPerson')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('establishmentForm.phoneNumber')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('establishmentForm.phoneNumber')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('establishmentForm.emailAddress')}</FormLabel>
              <FormControl>
                <Input placeholder={t('establishmentForm.emailAddress')} type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('establishmentForm.notes')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('establishmentForm.notes')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/establishments")}
          >
            {t('app.cancel')}
          </Button>
          <Button type="submit">
            {isEditing ? t('establishmentForm.update') : t('establishmentForm.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
