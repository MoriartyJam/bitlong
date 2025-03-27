
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingBag, ReceiptText, Users, Settings, Package } from 'lucide-react';
import MobileMenu from './MobileMenu';
import AppHeader from './AppHeader';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
      )}
    >
      <span className="text-current">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex flex-col w-64 p-4 border-r bg-sidebar">
        <div className="mb-8 px-4">
          <h1 className="text-xl font-display font-semibold text-foreground">Biltong Tracker</h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            isActive={pathname === '/'}
          />
          <NavItem 
            to="/establishments" 
            icon={<ShoppingBag size={18} />} 
            label="Establishments" 
            isActive={pathname.startsWith('/establishments')}
          />
          <NavItem 
            to="/transactions" 
            icon={<ReceiptText size={18} />} 
            label="Transactions" 
            isActive={pathname.startsWith('/transactions')}
          />
          <NavItem 
            to="/employees" 
            icon={<Users size={18} />} 
            label="Employees" 
            isActive={pathname.startsWith('/employees')}
          />
          <NavItem 
            to="/products" 
            icon={<Package size={18} />} 
            label="Products" 
            isActive={pathname.startsWith('/products')}
          />
        </nav>
        
        <div className="mt-auto">
          <NavItem 
            to="/settings" 
            icon={<Settings size={18} />} 
            label="Settings" 
            isActive={pathname === '/settings'}
          />
        </div>
      </aside>
      
      {/* Mobile header and main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="h-14 md:hidden flex items-center justify-between px-4 border-b bg-background z-10">
          <div className="flex items-center">
            <MobileMenu />
            <h1 className="text-lg font-display font-semibold ml-3">Biltong Tracker</h1>
          </div>
          <AppHeader />
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:py-8 md:px-10">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
