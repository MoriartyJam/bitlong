
import React from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileMenu() {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useLanguage();
  
  const navItems = [
    { to: '/', label: t('nav.dashboard'), active: pathname === '/' },
    { to: '/establishments', label: t('nav.establishments'), active: pathname.startsWith('/establishments') },
    { to: '/transactions', label: t('nav.transactions'), active: pathname.startsWith('/transactions') },
    { to: '/employees', label: t('nav.employees'), active: pathname.startsWith('/employees') },
    { to: '/products', label: t('nav.products'), active: pathname.startsWith('/products') },
    { to: '/settings', label: t('nav.settings'), active: pathname === '/settings' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-left">Biltong Tracker</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.to} 
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground/70 hover:text-foreground hover:bg-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
