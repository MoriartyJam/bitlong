
import { useLanguage } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg bg-card shadow-sm">
      <h3 className="font-medium text-lg">Language / Мова</h3>
      
      <RadioGroup 
        value={language} 
        onValueChange={(value) => setLanguage(value as 'en' | 'uk')}
        className="flex flex-col gap-2.5"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="en" />
          <Label htmlFor="en" className="cursor-pointer">English</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="uk" id="uk" />
          <Label htmlFor="uk" className="cursor-pointer">Українська</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
