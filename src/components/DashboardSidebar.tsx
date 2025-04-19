
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Package,
  Upload,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, path, isActive }: SidebarItemProps) => (
  <Link
    to={path}
    className={cn(
      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-navora-red/20 text-navora-red" 
        : "hover:bg-navora-lightgray/40 text-muted-foreground hover:text-foreground"
    )}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span>{label}</span>
  </Link>
);

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isMobileOpen, setIsMobileOpen }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Package size={20} />, label: 'My Agents', path: '/dashboard/agents' },
    { icon: <Upload size={20} />, label: 'Upload', path: '/dashboard/upload' },
    { icon: <BarChart2 size={20} />, label: 'Revenue', path: '/dashboard/revenue' },
    { icon: <MessageSquare size={20} />, label: 'Inbox', path: '/dashboard/inbox' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button - Visible only on mobile */}
      <div className="lg:hidden fixed top-20 left-4 z-30">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-navora-dark"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      {/* Sidebar Backdrop - Mobile only */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 pt-20 pb-6 bg-navora-dark border-r border-navora-lightgray transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full px-4">
          {/* Close button - Mobile only */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileOpen(false)}
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
          
          {/* User Profile Section */}
          <div className="flex flex-col items-center mb-8 px-4">
            <div className="w-16 h-16 rounded-full bg-navora-lightgray overflow-hidden mb-3">
              <img 
                src="https://randomuser.me/api/portraits/men/54.jpg" 
                alt="User Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Alex Johnson</h3>
              <p className="text-sm text-muted-foreground">Creator</p>
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="space-y-1 mb-6">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={isActive(item.path)}
              />
            ))}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="mt-auto">
            <div className="bg-navora-red/10 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">Creator Pro</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Upgrade to access premium features and reduced fees.
              </p>
              <Button 
                className="w-full bg-navora-red hover:bg-navora-red/90 text-sm"
                size="sm"
              >
                Upgrade Now
              </Button>
            </div>
            
            <Link to="/">
              <Button 
                variant="outline" 
                className="w-full border-navora-lightgray"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
