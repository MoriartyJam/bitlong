
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Settings } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppHeader() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Only show app name in desktop header, it's already in the mobile header
  return (
    <div className={`flex justify-between items-center ${isMobile ? '' : 'px-4 py-2 bg-background border-b border-border h-14'}`}>
      {!isMobile && (
        <Link to="/" className="font-semibold text-lg">
          Biltong Tracker
        </Link>
      )}
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align={isMobile ? "end" : "center"}>
            <LanguageSwitcher />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
